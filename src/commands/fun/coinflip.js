const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");

module.exports = new Command({
  name: "coinflip",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = "Heads";
    else result = "Tails";
    const embed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`**I flipped: \n${result}** 🪙`);
    message.reply({ embeds: [embed] });
  },
});
