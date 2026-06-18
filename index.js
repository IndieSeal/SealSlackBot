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

      <General>
      /seal-help - Welp, you figured this one out yourself (or how else did you get here?)
      /seal-ping - Check bot latency

      <My *seally* commands (get it? ._.)>
      /seal-randomspecie - Get a random seal specie's name
      /seal-gif - Get a random seal gif from GIPHY
      /seal-recommendation - Get a cool movie/series/game recommendation from a humble seal!`
  });
});

app.command("/seal-recommendation", async ({ command, ack, respond }) => {
  const myRecommendations = [
    "The Good Place - Really good series that teaches you philosophy while being hella funny",
    "The Office - Haven't finished it, it's an uncomfortable but hilarious humor, though Season 1 is not good in my opinion",
    "Everything Everywhere All at Once - Really good watch and it's indie!",
    "Hollow Knight && Silksong - Just play them, don't even ask",
    "The Finals - SUPER underrated shooter, the freshets game that has come out from the shooter genre in years",
    "Severance - Blew my mind, and the camera work is to die for",
    "https://indie-seal.itch.io/ - The coolest games made by the coolest seal >:]!"
  ];
  const recommendation = myRecommendations[Math.floor(Math.random() * myRecommendations.length)];

  await ack();
  await respond({ text: `${recommendation}`});
});

app.command("/seal-gif", async ({ ack, respond }) => {
  await ack();

  const tag = "Seal";
  const params = new URLSearchParams({
    api_key: process.env.GIPHY_KEY,
    tag,
    rating: "pg",
  });
  const response = await fetch(`https://api.giphy.com/v1/gifs/random?${params.toString()}`);
  if(!response.ok) {
    await respond({
      text: `GIPHY: Request failed`
    });
    return;
  }

  const json = await response.json();
  if(!json) return;
  
  const url = json.data.images.original.url;
  await respond({
    blocks:[
      {
        type: "image",
        image_url: url,
        alt_text: "seal",
      },
    ],
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