const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
  name: "firstmsg",
  description: "check first msg",
  permission: "SEND_MESSAGES",

  async run(message, args, client) {
    const channel = message.mentions.channels.first() || message.channel;
    const fetchMessages = await channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    const embed = new Discord.MessageEmbed()
      .setDescription(`**First Message in ${message.channel}**`)
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
      .setColor(16769278)
      .addFields(
        {
          name: "**Content:**",
          value: `🌸\`${msg.content}\`\n[First Message Link](${msg.url})`,
        },
        {
          name: "**Message ID:**",
          value: `🌸\`${msg.id}\``,
        },
        {
          name: "**Created At:**",
          value: `🌸\`${msg.createdAt.toLocaleDateString()}\``,
        }
      );
    message.reply({ embeds: [embed] });
  },
});
