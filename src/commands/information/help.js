const Command = require("../../Structures/Command");
const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "help",
  permission: "SEND_MESSAGES",
  type: "TEXT",
  description: "Displays all the commands",
  async run(message, args, client) {
    embeds = new Discord.MessageEmbed()
      .setTitle("Hello you lil weeb 😳")
      .setDescription(
        "By clicking on any of these buttons under this embed you will get list of commands."
      )
      .setColor("#ffa861")
      .setTimestamp();
    embed1 = new Discord.MessageEmbed()
      .setTitle(`Fun Commands 🧐`)
      .setDescription("Here area all the Available commands")
      .addField("commands:", "**8ball,  Coinflip, pls meme,  Wallpaper**,")
      .setColor("BLURPLE")
      .setFooter("1/5");
    embed2 = new Discord.MessageEmbed()
      .setTitle(`Moderation commands ⛔️`)
      .setDescription("Here area all the Available commands")
      .addField(
        "commands:",
        "**Ban,  Unban,  Kick,  Channel Nuke,  Tempmute,  Purge,**,"
      )
      .setColor("RED")
      .setFooter("2/5");
    embed3 = new Discord.MessageEmbed()
      .setTitle(`Usefull Commands ⛩️`)
      .setDescription("Here area all the Available commands")
      .addField(
        "commands:",
        "**whois,  serverinfo,  Avatar,  Firstmsg,  Help, Suggest, weather**,"
      )
      .setColor("GREY")
      .setFooter("3/5");
    embed4 = new Discord.MessageEmbed()
      .setTitle(`NSFW Commands 🔞`)
      .setDescription("Here area all the Available commands")
      .addField(
        "commands:",
        "**Erokemo,  Hentai,  Ass,  Thigh,  Hwallpaper,  Lewd,  Hmidriff,  Nekotits,  Solo**,"
      )
      .setColor("GREY")
      .setFooter("4/5");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Fun Commands 🧐")
        .setCustomId("btn1"),
      new MessageButton()
        .setStyle("DANGER")
        .setLabel("Moderation Commands ⛔️")
        .setCustomId("btn2"),
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Report and Misc Commands ⛩️")
        .setCustomId("btn3"),
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("NSFW Commands 🔞")
        .setCustomId("btn4")
    );

    let msg = await message.channel.send({
      embeds: [embeds],
      components: [row],
    });

    const filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true;
      return;
    };
    const collector = message.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", (ButtonInteraction) => {
      if (ButtonInteraction.customId === "btn1") {
        msg.edit({ embeds: [embed1], components: [row] });

        return;
      }

      if (ButtonInteraction.customId === "btn2") {
        msg.edit({ embeds: [embed2], components: [row] });

        return;
      }

      if (ButtonInteraction.customId === "btn3") {
        msg.edit({ embeds: [embed3], components: [row] });

        return;
      }

      if (ButtonInteraction.customId === "btn4") {
        msg.edit({ embeds: [embed4], components: [row] });

        return;
      }

      if (ButtonInteraction.customId === "btn5") {
        msg.edit({ embeds: [embed5], components: [row] });

        return;
      }
    });
  },
};
