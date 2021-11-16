const Discord = require("discord.js");
const Command = require("../../Structures/Command");
const { PieChart } = require("canvas-pie-chart");

module.exports = new Command({
  name: "chatchart",
  description: "chatchart",
  permission: "MANAGE_MESSAGES",

  async run(message, args, client) {
    const mLimit = 5000;

    const pEmbed = new Discord.MessageEmbed()
      .setColor("#a8f1ff")
      .setDescription(
        `**Fetching the past ${mLimit} messages** <a:loading:905785287525953639>`
      )
      .setFooter("This might take time");
    const m = message.channel.send({ embeds: [pEmbed] });

    async function fetchMore(channel, limit = 5000) {
      if (!channel) {
        throw new Error(`Expected channel, got ${typeof channel}.`);
      }
      if (limit <= 100) {
        return channel.messages.fetch({ limit });
      }

      let collection = new Discord.Collection();
      let lastId = null;
      let options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
          break;
        }

        collection = collection.concat(messages);
        lastId = messages.last().id;
      }

      return collection;
    }

    {
      try {
        let authors = [];
        const list = await fetchMore(message.channel, mLimit);
        const arraylist = Array.from(list);

        arraylist.forEach((array) => {
          authors.push(array[1].author.id);
        });
        let frequency = {};
        authors.forEach(function (item) {
          frequency[item] = frequency[item] ? frequency[item] + 1 : 1;
        });
        let intents = Object.entries(frequency)
          .sort((a, b) => b[1] - a[1])
          .map(function (x) {
            return x[0];
          });
        let finalthingyig = {};
        let chartlabels = [];
        for (const u of intents) {
          try {
            const newe = await client.users.fetch(u);
            if (newe.bot) continue;
            if (frequency[u] > 20) {
              finalthingyig[newe.tag] = frequency[u];
            } else {
              if (finalthingyig["Others"]) {
                finalthingyig["Others"] =
                  finalthingyig["Others"] + frequency[u];
              } else finalthingyig["Others"] = frequency[u];
            }
          } catch (e) {}
        }
        for (let i = 0; i < Object.keys(finalthingyig).length; i++) {
          chartlabels.push({
            text: Object.keys(finalthingyig)[i],
            size: Object.values(finalthingyig)[i],
          });
        }
        if (Object.keys(finalthingyig).length < 3)
          message.channel.send(`Just 2 people lol`);
        const chart = new PieChart({
          labels: chartlabels,
          blackOrWhiteInvert: false,
          size: 1024,
        });
        const buffer = chart.draw();
        const attachment = new Discord.MessageAttachment(buffer, "chart.png");

        const embed = new Discord.MessageEmbed()
          .setTitle(
            `**Chatchart of the past ${mLimit} messages in this channel**`
          )
          .setColor("#a8f1ff")
          .setDescription(
            `<:gold:905780106033778710>│**${
              Object.keys(finalthingyig)[0]
            }** - \`${Object.values(finalthingyig)[0]} [${
              (Object.values(finalthingyig)[0] / mLimit) * 100
            }%]\`
            <:silver:905780106100899871>│**${
              Object.keys(finalthingyig)[1]
            }** - \`${Object.values(finalthingyig)[1]} [${
              (Object.values(finalthingyig)[1] / mLimit) * 100
            }%]\`
            <:bronze:905780106000232488>│**${
              Object.keys(finalthingyig)[2]
            }** - \`${Object.values(finalthingyig)[2]} [${
              (Object.values(finalthingyig)[2] / mLimit) * 100
            }%]\``
          )
          .setImage("attachment://chart.png")
          .setFooter(
            `The numbers might not add up as it does not display bots`
          );
        message.reply({ embeds: [embed], files: [attachment] });
        m.delete();
      } catch (e) {
        const err = new Discord.MessageEmbed()
          .setAuthor(
            "ERROR",
            "https://images-ext-2.discordapp.net/external/osuvoFtp-tXIthBmsnVAdVeM11Zt30Aeemh_JxTnReE/https/cdn.discordapp.com/emojis/706499634083659827.png"
          )
          .setTitle("Something went wrong!")
          .setColor("#ff4a4a")
          .setDescription(`\`\`\`js\n${e.message}\n\`\`\``);

        message.reply({ embeds: [err] });
      }
    }
  },
});
