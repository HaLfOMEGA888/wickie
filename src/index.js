console.clear();

const Client = require("./structures/client");
const client = new Client();
const { TOKEN, PREFIX } = require("./data/config.json");

const { ClientRequest } = require("http");

client.start(TOKEN);
