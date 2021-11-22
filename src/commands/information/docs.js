const db = require("old-wio.db");
const axios = require("axios");
const Command = require("../../Structures/Command.js");

module.exports = new Command({
  name: 'djsdocs',
  async run(message, args, client) {
   const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embeds: [data]});
        } else {
          message.reply('Could not find that documentation')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
})