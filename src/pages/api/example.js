// import fetch from "node-fetch";

// export const config = {
//   runtime: "edge",
// };
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
    runtime: "edge",
  },
};

export default async (req, res) => {
  const url = `https://api.openai.com/v1/engines/davinci-codex/completions`;

  //   let body = JSON.stringify(req.body);
  const body = JSON.stringify({
    prompt: `<END>\nI will write a discussion:\n\nInstructions: ${req.body} \nDiscussion:\n`,
    max_tokens: 100,
    n: 1,
    stop: ".",
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    body,
  });

  const data = await response.json();

  res.json(data);
};
