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

    const reader = res.body.getReader();
    // console.log(reader, "reader");
    const decoder = new TextDecoder();
    let responseText = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        responseText += decoder.decode(value, { stream: true });
        // console.log(responseText, "responseText");
      }
      setResponse(responseText);
      //   const response = JSON.parse(responseText);
      //   console.log(response, "response");
      //
    } catch (error) {
      console.error("Failed to parse response from API", error);
    }

    setloading(false);
  };

  return (
    <>
      <h1>Stream</h1>
      <input
        type="text"
        value={prompt}
        onChange={handleChange}
        style={{ padding: "20px" }}
      />{" "}
      <button onClick={handleClick}>Fetch data</button>
      <p> {loading ? "loading..." : null}</p>
      <p>{response}</p>
      {/* {response?.name} */}
    </>
  );
};

export default Stream;
