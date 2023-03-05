import { useState } from "react";

const Example = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setloading] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = async () => {
    setloading(true);
    const res = await fetch("api/example", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue), // create a JSON object with input field
    });

    try {
      const data = await res.json();
      console.log(data);
      data ? setloading(false) : null;

      data.choices ? setResponse(data) : console.log("error");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={handleChange} />{" "}
      <button onClick={handleClick}>Fetch data</button>
      <p> {loading ? "loading..." : null}</p>
      <p>{response && response.choices[0].text}</p>
      {/* {response?.name} */}
    </>
  );
};

export default Example;
