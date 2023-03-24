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

/* 
Who is the main character of the story?
What did Sarah find while playing in the forest?
Where did the mysterious door lead to?
Who ruled the magical kingdom?
What did Sarah see when she arrived in the kingdom?
What did Sarah want to do after seeing the kingdom?
What did the queen warn Sarah about?
What happened when Sarah went back through the door?
Do you think Sarah will ever visit the magical kingdom again?
What did you enjoy most about the story?
*/

export default async function handler(req, res) {
  const { question } = req.body;

  let url = "https://api.openai.com/v1/completions";
  // "Once upon a time, there was a beautiful princess who lived in a magnificent castle...";

  let story =
    "Once upon a time, there was a little girl named Sarah who loved to play outside in the forest. One day, while wandering through the trees, she stumbled upon a mysterious door. Curious, she pushed it open and found herself in a magical kingdom ruled by a wise queen. The queen welcomed Sarah and showed her all around the kingdom, introducing her to the talking animals, the fairies, and the wizards who lived there. Sarah was enchanted by everything she saw and wanted to stay forever. But as the sun began to set, the queen warned Sarah that the door she had come through would soon close, and if she didn't leave now, she would be trapped in the kingdom forever. So, reluctantly, Sarah said goodbye and hurried back through the door, which shut tightly behind her.";

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

    // console.log(`Q: ${question}\nA: ${answer}\n`);
    res.json({ answer: `Q: ${question}\nA: ${answer}\n` });
  }

  await askQuestion(story, question);
}
