import { OpenAIStream } from "../../utils/OpenAi";

export const config = {
  runtime: "edge",
};

export default async (req, res) => {
  const { prompt } = await req.json();

  console.log(prompt);
  const question = "ok gist me am bored";
  if (!question) {
    return new Response("No prompt in  the request", { status: 400 });
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 3,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

// export default handler;
