import { OpenAIStream } from "../../utils/OpenAi";

export const config = {
  runtime: "edge",
};

function preprocessText(text) {
  // Convert text to lowercase
  text = text.toLowerCase();

  // Remove non-alphabetic characters
  text = text.replace(/[^a-zA-Z ]/g, "");

  // Remove duplicate words
  const words = text.split(" ");
  const uniqueWords = [...new Set(words)];
  text = uniqueWords.join(" ");

  // Remove unnecessary punctuation
  text = text.replace(/[,.\n]/g, "");

  return text.trim();
}

export default async (req, res) => {
  const { prompt } = await req.json();

  console.log(prompt);
  const question = "ok gist me am bored";
  if (!question) {
    return new Response("No prompt in  the request", { status: 400 });
  }

  const text = preprocessText(prompt);

  const payload = {
    model: "gpt-3.5-turbo",
    // model: "Text-davinci-003",
    messages: [{ role: "user", content: text }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    // max_tokens: 200,
    stream: true,
    n: 3,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

// export default handler;
