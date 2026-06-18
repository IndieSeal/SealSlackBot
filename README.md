**Hello there!**

This is a Slack Bot made for silly purposes for the Stardance Challenge!


## Description:
This bot reacts to slash commands sent by the user, these mostly are made to be funny, and REAL special for seal lovers.

## Used APIs:
-GIPHY's API: This API was used to send GIFs about seals! And maybe it was just me, but finding docs for JavaScript was a pain... [https://developers.giphy.com/]

-API Ninjas: This API was used to retrieve fun seal facts, but was ultimately just used to get names of random CUTE seals! [https://api-ninjas.com/]

## How to use
If you want to jump right in, use this command:
```/seal-help```

All of the commands start with /seal-{command_name}, and the following are the ones that exist currently:
```
/seal-help  # Get all the existing commands and their descriptions
/seal-ping  # Get a ping, to know the delay between you and the bot!

/seal-recommendation  # Get a personal recommendation from a seal of a movie/series/game
/seal-randomspecie  # Get a random seal specie's name
/seal-gif  # Get a cute seal gif!
```

## How to make it work locally

1. Clone this repo
2. Run in the terminal: `npm install`
3. Create a `.env` file and put your tokens in it:
   ```
   SLACK_BOT_TOKEN=your-token
   SLACK_APP_TOKEN=your-token
   API_NINJAS_KEY=your-token
   GIPHY_KEY=your-token
   ```
4. Run in the terminal: `node index.js`
5. Done! Test your commands on Slack :>
