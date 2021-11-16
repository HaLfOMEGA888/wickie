const Command = require("../../Structures/Command.js");
const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = new Command({
  name: "pls",
  description:
    "gives you a post from the subreddit you have chosen (cannot post nsfw posts unless in an nsfw channel)",
  permission: "SEND_MESSAGES",

  async run(message, args, client) {
    subreddit = args[1];
    try {
      data = await axios
        .get(`http://meme-api.herokuapp.com/gimme/${subreddit.toLowerCase()}`)
        .then((res) => res.data);
      const embed = new Discord.MessageEmbed();
      embed
        .setTitle(data.title)
        .setImage(data.url)
        .setAuthor(
          `Post made by ${data.author}`,
          "https://cdn.icon-icons.com/icons2/1906/PNG/512/iconfinder-reddit-4550872_121349.png"
        )
        .setURL(data.postLink)
        .setColor("#FF5700")
        .setTimestamp()
        .setFooter(`${data.ups} Upvotes`);
      if (data.nsfw == true) {
        if (message.channel.nsfw) {
          message.channel.send({
            embeds: [embed],
          });
        } else {
          message.reply("Post is NSFW, Cannot be posted in an SFW channel");
        }
      } else if (data.nsfw == false) {
        message.channel.send({
          embeds: [embed],
        });
      }
    } catch (error) {
      message.reply(subreddit + " is not an existing subreddit.");
    }
  },
});
