const Discord = require("discord.js");
const Command = require("../../Structures/Command.js");
const ms = require("ms");

module.exports = new Command({
  name: "mute",
  description: "Mute a member!",
  permission: "MANAGE_ROLES",

  async run(message, args, client) {
    // Find the muted role
    const muteRole = message.guild.roles.cache.find((role) =>
      role.name.toLowerCase().startsWith("muted")
    );
    if (!muteRole)
      return message.reply("I was unable to find the a role in this server");

    // Find the mentioned member
    const mentionMember = message.mentions.members.first();
    if (!mentionMember) return message.reply("You did not mention a member!");

    try {
      await mentionMember.roles.add(muteRole);
      message.reply(
        `${mentionMember} has been muted for ${ms(ms(args[2], { long: true }))}`
      );
      if (args[2]) {
        const time = ms(args.slice(2).join(" "));
        setTimeout(() => mentionMember.roles.remove(muteRole), time);
      }
    } catch (err) {
      console.error(err);
      message.reply("An error occured while trying to mute this member");
    }
  },
});
