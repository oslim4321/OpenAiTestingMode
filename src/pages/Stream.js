import { useState } from "react";

const Stream = () => {
  const [prompt, setprompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setloading] = useState(false);

  const handleChange = (event) => {
    setprompt(
      `Generate professional text with no hashtags and clearly labeled "1)" and "2) also make sure you are not repeating your text it annoying". 
      Make sure each generated biography is less than 120 characters, 
      has short sentences that are found in Twitter bios, and base them on this context ${event.target.value}`
    );
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
        // value={prompt}
        onChange={handleChange}
        style={{ padding: "20px" }}
      />
      <button onClick={handleClick}>Fetch data</button>
      <p> {loading ? "loading..." : null}</p>
      {/* <p>{response}</p> */}

      <div>
        {response &&
          response
            .substring(response.indexOf("1") + 3)
            .split("2)")
            .map((generatedBio) => {
              return (
                <div
                  key={generatedBio}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  <p> {generatedBio}</p>
                </div>
              );
            })}

        {/* <h2>Generate 2</h2>
        {response &&
          response
            .split(/[\d]+\.\s+/)
            .slice(1)
            .map((generatedBio, index) => (
              <div
                key={index}
                style={{ backgroundColor: "green", color: "white" }}
              >
                <p>{generatedBio}</p>
              </div>
            ))} */}
      </div>
    </>
  );
};

export default Stream;
