// export default async function handler(req, res) {
//     let url = "https://api.openai.com/v1/completions";
//       const { question } = req.body;

//   let story =
//     "Once upon a time, there was a beautiful princess who lived in a magnificent castle...";
//   let questions = [
//     "What was the princess like?",
//     "Where did she live?",
//     "Did she have any companions?",
//     "What happened to her castle?",
//   ];

//   async function askQuestion(story, question) {
//     const payload = {
//       model: "text-davinci-002",
//       prompt: `${story}\nQ: ${question}\nA:`,
//       temperature: 0.5,
//       max_tokens: 100,
//       n: 1,
//       stop: "A:",
//     };

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY2}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();
//     // return res.json(data);
//     const answer = data.choices[0].text.trim();

//     console.log(`Q: ${question}\nA: ${answer}\n`);
//     res.json(`Q: ${question}\nA: ${answer}\n`);
//   }

//   for (let question of questions) {
//     await askQuestion(story, question);
//   }
// }

export default async function handler(req, res) {
  const { question } = req.body;

  let url = "https://api.openai.com/v1/completions";

  let story =
    "Once upon a time, there was a beautiful princess who lived in a magnificent castle...";

  async function askQuestion(story, question) {
    const payload = {
      model: "text-davinci-002",
      prompt: `${story}\nQ: ${question}\nA:`,
      temperature: 0.5,
      max_tokens: 100,
      n: 1,
      stop: "A:",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY2}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const answer = data.choices[0].text.trim();

    console.log(`Q: ${question}\nA: ${answer}\n`);
    res.json({ answer: `Q: ${question}\nA: ${answer}\n` });
  }

  await askQuestion(story, question);
}
