import formidable from "formidable";
import pdfParse from "pdf-parse";

export default async function handler(req, res) {
  console.log("Received request");

  const form = formidable({ multiples: false });

  try {
    const { pdf } = await form.parse(req);
    console.log(pdf);

    console.log("Parsed form data");

    // if (!pdf) {
    //   res.status(400).json({ error: "No PDF file uploaded." });
    //   return;
    // }

    console.log("Processing PDF file");

    const { text } = await pdfParse(pdf.path);

    console.log("Parsed PDF file");

    res.status(200).json({ text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
