require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/seal-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Seal found!\nLatency: ${latency}ms` });
});

app.command("/seal-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
      `Available Commands:
      /seal-ping - Check bot latency
      /seal-fact - Get a seal fact`
  });
});

const phrases = [
  'They are very huggable!',
  'Such cuties!',
  'So squishy they could explodeee'
];

app.command("/seal-fact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await fetch("https://api.api-ninjas.com/v1/animals?name=seal", {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY
      }
    });

    const animals = await response.json();

    if (!Array.isArray(animals) || animals.length === 0) {
      await respond("I couldn't find any seal facts :[");
      return;
    }

    const seal = animals[Math.floor(Math.random() * animals.length)];

    const facts = [
      `Diet: ${seal.characteristics?.diet}`,
      `Habitat: ${seal.characteristics?.habitat}`,
      `Lifespan: ${seal.characteristics?.lifespan}`,
      `Weight: ${seal.characteristics?.weight}`
    ].filter(fact => !fact.includes("undefined"));

    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    await respond({
      text: `🦭 *${seal.name}*\n${facts.join("\n")}\n*${phrase}*`
    });
  } catch (error) {
    console.error(error);
    await respond("Something went wrong while getting a seal fact.");
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();