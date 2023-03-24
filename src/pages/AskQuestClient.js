import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [answer, setanswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/AskQuest", {
      method: "POST",
      body: JSON.stringify({ question: inputValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { answer } = await response.json();
    setanswer(answer);
    console.log(answer); // Do something with the answer
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Ask a question:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
        <p>{answer && answer}</p>
      </form>
    </div>
  );
}
