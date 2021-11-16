const Command = require("../../structures/Command.js");
const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = new Command({
  name: "wallpaper",
  description: "wallpaper!",
  type: "BOTH",
  slashCommandOptions: [],
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const { url } = await axios
      .get("https://nekos.life/api/v2/img/wallpaper")
      .then((res) => res.data);

    const embed = new Discord.MessageEmbed().setColor("RANDOM").setImage(url);

    message.channel.send({ embeds: [embed] });
  },
});
