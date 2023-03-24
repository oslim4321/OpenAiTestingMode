import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    setInputValue("");

    const response = await fetch("/api/AskQuest", {
      method: "POST",
      body: JSON.stringify({ question: inputValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { answer } = await response.json();
    const [q, a] = answer.split("A:");
    console.log(answer, "me");

    if (answer) {
      setloading(false);
      setQuestionList([
        ...questionList,
        {
          question: q,
          answer: a,
        },
      ]);
    }
    setloading(false);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: "15%" }}>
        {questionList.map((questAnswer, index) => (
          <div key={index} className="qa-box">
            <div className="question">{questAnswer.question}</div>
            <div className="answer">
              {loading ? (
                "loading..."
              ) : (
                <div>
                  {questAnswer.answer.split(/,\s*/).map((elem) => (
                    <div>{elem}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="formInp">
        {/* <label>Ask a question:</label> */}
        <input
          type="text"
          onChange={handleChange}
          value={inputValue}
          className="textArea"
        />
        {loading ? (
          <button>Loading...</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}
