const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
  name: "ass",
  description: "Sends hentai ass pictures.",
  permission: "SEND_MESSAGES",
  type: "TEXT",
  async run(message, args, client) {
    var errMessage = "This is not an NSFW Channel";
    if (!message.channel.nsfw) {
      message.react("💢");

      return message.reply(errMessage).then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });
    }

    const image = await nsfw.hentaiass();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Hentai Ass`)
      .setColor("RANDOM")
      .setImage(image);
    message.reply({ embeds: [embed] });
  },
};
