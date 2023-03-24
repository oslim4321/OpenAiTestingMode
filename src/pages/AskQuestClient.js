import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

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
    const [q, a] = answer.split("A:");
    setQuestion(q);
    setAnswer(a);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Ask a question:
          <textarea
            cols="30"
            rows="10"
            value={inputValue}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
      {question && (
        <div>
          <h2>Question: {question}</h2>
          <h2>Answer: {answer}</h2>
        </div>
      )}
    </div>
  );
}
