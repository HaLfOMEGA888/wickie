const Discord = require("discord.js");
const Command = require("../../Structures/Command.js");

module.exports = new Command({
  name: "unban",
  description: "Unban's someone from the server!",
  permission: "BAN_MEMBERS",
  async run(message, args, client) {
    if (message.deletable) await message.delete();

    //Variables:
    let reason = args.slice(2).join(" ");
    let userID = args[1];

    //Input Checking:
    if (!reason) reason = "No reason given.";
    if (!args[0])
      return message.channel.send(
        "You must state a member to unban. `>unban ID reason`"
      );
    args.shift();
    if (isNaN(args[0]))
      return message.channel.send(
        "The ID stated is not a number `>unban ID reason`"
      );

    //Executting:
    message.guild.bans.fetch().then(async (bans) => {
      if (bans.size == 0)
        return message.channel.send("This server does not have anyone banned");
      let bUser = bans.find((b) => b.user.id == userID);
      if (!bUser)
        return message.channel.send("The user ID stated is not banned");
      await message.guild.members
        .unban(bUser.user, reason)
        .catch((err) =>
          console
            .log(err)
            .then(message.channel.send("Somthing went wrong unbanning the ID."))
        );

      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(`*Successfully Unbanned **${bUser?.user?.tag}***`)
            .setColor("#00ff00"),
        ],
      });
    });
  },
});
