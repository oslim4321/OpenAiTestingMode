import { useState } from "react";

// let process = `
//     Text Preprocessing: Remove any unwanted characters, stop words, and other irrelevant information from your text. You can use NLTK library to perform tokenization, stemming, and lemmatization.
//     Text Cleaning: Remove any special characters, digits, and other non-alphabetic characters from your text.
//     Text Normalization: Normalize your text by converting all text to lowercase, removing any non-standard abbreviations, and expanding any contracted forms of words.
//     Remove Repeated Words: After pre-processing, you can remove any duplicate words in the text to avoid repetition.
//     Remove Unnecessary Punctuation: You can also remove any unnecessary punctuation marks like commas, dots, and exclamation marks that do not add any value to the text.
// `;
// `Generate professional text with no hashtags and clearly labeled "1)" and "2)".Make sure each generated biography is less than 120 characters, and base them on this context

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

    //     if (!res.ok) {
    //       console.error("Failed to fetch response from API");
    //       setloading(false);
    //       return;
    //     }
    //     console.log(res, "res");

    //     const reader = res.body.getReader();
    //     const decoder = new TextDecoder();
    //     let responseText = "";

    //     try {
    //       while (true) {
    //         const { done, value } = await reader.read();
    //         if (done) break;
    //         responseText += decoder.decode(value, { stream: true });
    //       }
    //       console.log(responseText);

    //       let i = 0;
    //       const timer = setInterval(() => {
    //         if (i < responseText.length) {
    //           setResponse((prevResponse) => prevResponse + responseText[i]);
    //           i++;
    //         } else {
    //           clearInterval(timer);
    //           setloading(false);
    //         }
    //       }, 50);
    //     } catch (error) {
    //       console.error("Failed to parse response from API", error);
    //     }
    //   };

    console.log(res);
    if (!res.ok) {
      console.error("Failed to fetch response from API");
      setloading(false);
      return;
      //   throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = res.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }

    setloading(false);
  };

  const sentences = response?.split(/\d+\.\s*/);
  // const sentences = response?.split(/\b\d+\.\s*|\b[A-Za-z]\.\s*/);

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
        {/* {response &&
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
            })} */}

        {sentences &&
          sentences

            // .substring(sentences.indexOf("1") + 5)

            // .split(r'\d+\.')
            .map((res, index) => {
              return (
                <div key={index}>
                  <p>
                    {index + 1}. {res}
                  </p>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Stream;
