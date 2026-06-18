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

app.command("/seal-randomspecie", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await fetch("https://api.api-ninjas.com/v1/animals?name=seal", {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY
      }
    });

    const animals = await response.json();
    const seal = animals[Math.floor(Math.random() * animals.length)];
    await respond({ text: `Random Seal Name: *${seal.name}*` });
  } catch (err) {
    await respond({ text: "Failed to fetch a seal name." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();