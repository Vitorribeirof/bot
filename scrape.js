const axios = require("axios");
const cheerio = require("cheerio");

const _url =
  "https://www.tudocelular.com/Apple/precos/n6509/Apple-iPhone-12.html";

const init = async () => {
  const { data } = await axios.get(_url);

  const $ = cheerio.load(data);

  const item = $("div.item");

  const titles = $(item).find("div.text a");

  const stores = $(item).find("div.price");

  const items = [];

  titles.each((_, title) => {
    items.push({ title: $(title).text() });
  });

  stores.each((i, el) => {
    const element = $(el).find("a.negozio");
    const price = $(el).find("a.importo");
    const store = $(element).text();
    const url = $(element).attr("href");
    items[i].store = store;
    items[i].url = `https://www.tudocelular.com${url}`;
    items[i].price = $(price).text();
  });

  return items.slice(0, 1);
};

module.exports = { init };
