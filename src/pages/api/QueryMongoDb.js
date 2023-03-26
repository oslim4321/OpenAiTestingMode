import dbConnect from "../../../libs/connectDb";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY2;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const {
    chunkSize = 500,
    prompt = "explain Chapter 33: Progress Element for me",
  } = req.query;

  try {
    console.log("i am trunna connect");
    const database = await dbConnect();

    console.log("Connected to MongoDB");

    const collection = database.connection.collection("AskQuestion");
    console.log("Retrieved collection");

    const cursor = collection.find();
    const results = await cursor.toArray();

    const response = await generateResponse(
      results.map((result) => result.txt).join("\n"),
      prompt
    );

    res.status(200).json({ response });
  } catch (err) {
    console.error(err, "err");
    res.status(500).json({ message: "Internal server error" });
  }
}

async function generateResponse(text, prompt) {
  const url = "https://api.openai.com/v1/completions";
  //   const data = {
  //     model: "text-davinci-002",

  //     prompt: prompt,
  //     max_tokens: 150,
  //     temperature: 0.5,
  //     n: 1,
  //     stream: false,
  //     prompt_context: { text: text },
  //   };
  const data = {
    model: "text-davinci-002",
    prompt: `${text}\n${prompt}`,
    max_tokens: 150,
    temperature: 0.5,
    n: 1,
    stream: false,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(data),
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return jsonResponse.choices[0].text.trim();
// }

// import dbConnect from "../../../libs/connectDb";
// // import fetch from "node-fetch";

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY2;

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     res.status(405).json({ message: "Method not allowed" });
//     return;
//   }

//   const {
//     chunkSize = 500,
//     prompt = "explain Chapter 33: Progress Element for me",
//   } = req.query;

//   try {
//     console.log("Connecting to MongoDB");
//     const database = await dbConnect();

//     console.log("Connected to MongoDB");

//     const collection = database.connection.collection("AskQuestion");
//     console.log("Retrieved collection");

//     const cursor = collection.find();
//     const results = await cursor.toArray();

//     let response = "";
//     let startIndex = 0;
//     while (startIndex < results.length) {
//       const endIndex = Math.min(startIndex + chunkSize, results.length);
//       const chunk = results
//         .slice(startIndex, endIndex)
//         .map((result) => result.txt)
//         .join("\n");
//       const chunkResponse = await generateResponse(chunk, prompt, chunkSize);
//       response += chunkResponse;
//       startIndex = endIndex;
//     }

//     res.status(200).json({ response });
//   } catch (err) {
//     console.error(err, "err");
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

// async function generateResponse(text, prompt, chunkSize) {
//   const url = "https://api.openai.com/v1/completions";
//   let response = "";
//   let chunks = text.match(new RegExp(`.{1,${chunkSize}}`, "g"));

//   for (let i = 0; i < chunks.length; i++) {
//     let data = {
//       model: "text-davinci-002",
//       prompt: `${chunks.slice(0, i + 1).join("")}\n${prompt}`,
//       max_tokens: 150,
//       temperature: 0.5,
//       n: 1,
//       stream: false,
//     };
//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify(data),
//     });
//     const jsonResponse = await res.json();
//     response += jsonResponse.choices[0].text.trim();
//   }

//   return response;
// }
