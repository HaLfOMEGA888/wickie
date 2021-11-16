const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");

const moment = require("moment");

module.exports = new Command({
  name: "whois",
  description: "Display's the Information on a user",
  permission: "KICK_MEMBERS",
  async run(message, args, cmd, client, discord) {
    const Target = message.mentions.users.first() || message.author;
    const Member = message.guild.members.cache.get(Target.id);

    const Response = new MessageEmbed()
      .setAuthor(
        `${Target.username}`,
        Target.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
      .setColor("RED")
      .addField("UserID", `${Target.id}`, false)
      .addField(
        "Roles",
        `${Member.roles.cache
          .map((r) => r)
          .join(" ")
          .replace("@everyone", " ")}`
      )
      .addField(
        "Server Member Since",
        `${moment(Member.joinedAt).format(
          "MMMM Do YYYY, h:mm:ss"
        )}\n**-** ${moment(Member.joinedAt).startOf("day").fromNow()}`
      )
      .addField(
        "Joined Discord",
        `${moment(Target.createdAt).format(
          "MMMM Do YYYY, h:mm:ss"
        )}\n**-** ${moment(Target.createdAt).startOf("day").fromNow()}`
      );
    message.channel.send({ embeds: [Response] });
  },
});
