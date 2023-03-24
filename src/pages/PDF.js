import { useState } from "react";

export default function Pdf() {
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    if (!file) {
      alert("Please select a file.");
      setloading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/ParsePdf", {
      method: "POST",
      body: formData,
    });
    setloading(false);
    console.log(res);

    if (!res.ok) {
      alert("Failed to upload file.");
      setloading(false);
      return;
    }

    const resu = await res.json();
    console.log(resu);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        {loading && <div>loading</div>}
      </form>
    </div>
  );
}
