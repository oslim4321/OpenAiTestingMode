import { useState } from "react";

const Stream = () => {
  const [prompt, setprompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setloading] = useState(false);

  const handleChange = (event) => {
    setprompt(event.target.value);
  };

  const handleClick = async () => {
    setloading(true);
    const res = await fetch("api/Stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!res.ok) {
      console.error("Failed to fetch response from API");
      setloading(false);
      return;
    }
    console.log(res, "res");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let responseText = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        responseText += decoder.decode(value, { stream: true });
      }
      console.log(responseText);

      let i = 0;
      const timer = setInterval(() => {
        if (i < responseText.length) {
          setResponse((prevResponse) => prevResponse + responseText[i]);
          i++;
        } else {
          clearInterval(timer);
          setloading(false);
        }
      }, 50);
    } catch (error) {
      console.error("Failed to parse response from API", error);
    }
  };

  return (
    <>
      <h1>Stream</h1>
      <input
        type="text"
        value={prompt}
        onChange={handleChange}
        style={{ padding: "20px" }}
      />
      <button onClick={handleClick}>Fetch data</button>
      <p> {loading ? "loading..." : null}</p>
      <p>{response}</p>
    </>
  );
};

export default Stream;
