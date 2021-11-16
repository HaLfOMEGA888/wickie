const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
  name: "8ball",
  description: "8ball",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    if (!args[2]) return message.reply(":x: Please ask a full question!");
    let replies = [
      "Yes.",
      "No.",
      "I don't know.",
      "Ask again later.",
      "Maybe...",
      "Clearly Not!",
      "Definitely!",
      "Not Really :/",
      "Probably :)",
      "Who am i? A fortune teller...",
      "Iki is busy currently",
      "I think ive stated yes already so, no",
      "Definetly yes",
    ];
    let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(1).join(" ");

    const embed = new Discord.MessageEmbed();
    embed.setColor("#a8f1ff");
    embed.setAuthor(
      message.author.username,
      message.author.avatarURL({ dynamic: true })
    ),
      embed.addField(":8ball: Question", question);
    embed.addField(":8ball: Answer", replies[result]);

    message.reply({ embeds: [embed] });
  },
});
