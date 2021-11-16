const Command = require("../../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
  name: "suggest",
  description: "suggestion command",
  permission: "SEND_MESSAGES",

  async run(message, args, client, member, guild) {
    const channel = message.guild.channels.cache.get("867415845936562226"); //change the channel id to your channel id

    let suggestmessage = args.slice(1).join(" ");

    let suggestembed = new Discord.MessageEmbed()
      .setTitle("A new suggestion has been made:")
      .setDescription(`${suggestmessage}`)
      .setTimestamp()
      .setFooter(`${message.author.username}`)
      .setColor("RANDOM");

    let msg = await channel.send({ embeds: [suggestembed] });

    msg.react("✅");
    msg.react("❌");

    let sentembed = new Discord.MessageEmbed()
      .setTitle("Success")
      .setDescription(`Succesfully sent the suggestion: ${suggestmessage}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`${message.author.username}`);

    let msg2 = await message.channel.send({ embeds: [sentembed] });

    setTimeout(() => msg2.delete(), 5000);
  },
});
