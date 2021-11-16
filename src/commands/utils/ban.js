const Command = require("../../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
  name: "ban",
  description: "ban someone",
  permission: "BAN_MEMBERS",
  async run(message, args, client) {
    const target =
      message instanceof Discord.CommandInteraction
        ? message.guild.members.cache.find((m) => m.id === args[1])
        : message.mentions.members.first() ||
          message.guild.members.cache.find((m) => m.id === args[1]);

    if (!target) return message.reply("You did not add a member for me to ban");

    if (target.user === client.user)
      return message.reply("I can't allow you to ban myself");

    if (target.user === message.member.user)
      return message.reply("I can't allow you to ban yourself");

    if (target.roles.highest.position > message.guild.me.roles.highest.position)
      return message.reply(
        "Their highest role position is higher than my highest role"
      );

    if (target.roles.highest.position === message.member.roles.highest.position)
      return message.reply(
        `Your highest role position is the same as the targeted member's highest role`
      );

    if (target.roles.highest.position > message.member.roles.highest.position)
      return message.reply(
        `Their role position is higher than your highest role`
      );

    if (
      target.roles.highest.position === message.guild.me.roles.highest.position
    )
      return message.reply("Their highest role is the same position as mine");

    const reason = args.slice(2).join(" ");

    if (reason && reason.length > 512)
      return message.reply("The reason must be less than 512 characters");

    if (target.bannable === false)
      return message.reply("I am unable to ban this member");

    const embed = new Discord.MessageEmbed()
      .setTitle(`${target.user.username} has been banned`)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor("RED")
      .addFields([
        {
          name: "Reason:",
          value: reason ? reason : `No reason specified`,
          inline: true,
        },
        {
          name: "Banned by:",
          value: message.member.user.username,
          inline: true,
        },
      ])
      .setTimestamp();

    try {
      target
        .ban({ days: 7, reason: reason })
        .then(message.reply({ embeds: [embed] }));
      target
        .send(`You have been banned from **HaLf**| Reason:-${reason}`)
        .catch((err) => {
          message.reply("I am unable to dm this user sorry :(");
        });
    } catch (err) {
      message.reply("I am unable to ban this member");
      console.log(err);
    }
  },
});
