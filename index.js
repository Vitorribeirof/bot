require("dotenv").config();

const { Telegraf } = require("telegraf");

const scrape = require("./scrape.js");

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("O bot está online!");

bot.start((ctx) => {
  let message = "O bot está sendo iniciado...";
  ctx.reply(message);
});

bot.command("iphone", async (ctx) => {
  let offer = {};
  try {
    setInterval(async () => {
      const offers = await scrape.init();
      for (let i = 0; i < offers.length; i++) {
        if (offers[i].price === offer.price) continue;
        offer = offers[i];
        ctx.reply(
          `${offers[i].title}\n\nPreço: ${offers[i].price}\n\nLoja: ${offers[i].store}\n\nLink: ${offers[i].url}`
        );
      }
    }, 10000);
  } catch (error) {
    console.log("error", error);
    ctx.reply("Error sending message");
  }
});

bot.launch();
