const Discord = require("discord.js");
const Command = require("./command");
const fs = require("fs");
const config = require("../data/config.json");
const Events = require("./events.js");
const intents = new Discord.Intents(32767);
class Client extends Discord.Client {
  constructor() {
    super({ intents });

    /**
     * @type {Discord.Collection<string, Commands>}
     */
    this.commands = new Discord.Collection();

    this.prefix = config.PREFIX;
  }
  start(TOKEN) {
    const directory = fs.readdirSync("./src/Commands");
    directory.forEach((dir) => {
      const commandFiles = fs
        .readdirSync(`./src/Commands/${dir}`)
        .filter((file) => file.endsWith(".js"));
      /**
       * @type {Command[]}
       */
      const commands = commandFiles.map((file) =>
        require(`../Commands/${dir}/${file}`)
      );

      commands.forEach((command) => {
        console.log(` Command ${command.name} loaded `);
        this.commands.set(command.name, command);
      });
    });
    fs.readdirSync("./src/events")
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        /**
         * @type {events}
         */
        const event = require(`../events/${file}`);
        console.log(`Events ${event.event} ✅`);
        this.on(event.event, event.run.bind(null, this));
      });
    this.login(TOKEN);
  }
}
module.exports = Client;
