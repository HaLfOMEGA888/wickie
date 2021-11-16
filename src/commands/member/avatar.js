const Command = require("../../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
  name: "avatar",
  description: "Shows a user's avatar",
  type: "BOTH",
  slashCommandOptions: [
    {
      name: "user",
      description: "To see other peoples avatar",
      type: "USER",
      required: true,
    },
  ],
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const Target =
      message instanceof Discord.CommandInteraction
        ? message.guild.members.cache.find((m) => m.id === args[1]) ||
          message.guild.members.cache.find((m) => m.id === message.user.id)
        : message.mentions.members.first() || message.member;
    const member =
      message instanceof Discord.CommandInteraction
        ? message.guild.members.cache.find((m) => m.id === message.user.id)
        : message.member;

    const Response = new Discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setAuthor(`${Target.user.tag}\'s Avatar`)
      .setImage(Target.user.displayAvatarURL({ dynamic: true, size: 4096 }));

    message.reply({ embeds: [Response] });
  },
});
