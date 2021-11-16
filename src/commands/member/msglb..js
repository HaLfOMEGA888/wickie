const Discord = require("discord.js");
const Command = require("../../Structures/Command");

module.exports = new Command({
  name: "msglb",
  description: "message leaderboard",
  permission: "MANAGE_MESSAGES",

  async run(message, args, client) {
    // just remove this line ^^^^^ if you dont want it to be owner only.

    const Fetching = new Discord.MessageEmbed()
      .setColor("#a8f1ff")
      .setDescription(
        `**Fetching the past ${args[1]} messages** <a:loading:905785287525953639>`
      )
      .setFooter("This might take time");
    const m = await message.channel.send({ embeds: [Fetching] });

    const mLimit = args[1];
    async function fetchMore(channel, limit = 5000) {
      if (!channel) {
        throw new Error(`Expected channel, got ${typeof channel}.`);
      }
      if (limit <= 100) {
        channel.messages.fetch({
          limit,
        });
        let cmessages = await channel.messages.fetch({});
        let messages = [];
        Array.from(cmessages.values()).forEach((m) =>
          messages.push(m.author.id)
        );
        return messages;
      }
      let messages = [];
      let lastId = null;
      let options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        let cmessages = await channel.messages.fetch(options);
        Array.from(cmessages.values()).forEach((m) =>
          messages.push(m.author.id)
        );
        if (!cmessages.last()) {
          break;
        }
        lastId = cmessages.last().id;
      }

      return messages;
    }

    {
      try {
        const authors = await fetchMore(message.channel, mLimit);
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
        if (Object.keys(finalthingyig).length < 3)
          message.channel.send(`Just 2 people lol`);

        const embed = new Discord.MessageEmbed()
          .setAuthor(
            `${message.guild.name}`,
            `${message.guild.iconURL({ dynamic: true })}`
          )
          .setTitle(`**Leaderboard for __${message.channel.name}__**`)
          .setColor("#a8f1ff")
          .setDescription(
            `<:gold:905780106033778710>│**${
              Object.keys(finalthingyig)[0]
            }** - \`${Object.values(finalthingyig)[0]}\`
<:silver:905780106100899871>│**${Object.keys(finalthingyig)[1]}** - \`${
              Object.values(finalthingyig)[1]
            }\`
<:bronze:905780106000232488>│**${Object.keys(finalthingyig)[2]}** - \`${
              Object.values(finalthingyig)[2]
            }\`
<:unranked:905780104171515955>│**${Object.keys(finalthingyig)[3]}** - \`${
              Object.values(finalthingyig)[3]
            }\`
<:unranked:905780104171515955>│**${Object.keys(finalthingyig)[4]}** - \`${
              Object.values(finalthingyig)[4]
            }\``
          );
        message.reply({ embeds: [embed] });
        m.delete();
      } catch (e) {
        const err = new Discord.MessageEmbed()
          .setAuthor(
            "ERROR",
            "https://images-ext-2.discordapp.net/external/osuvoFtp-tXIthBmsnVAdVeM11Zt30Aeemh_JxTnReE/https/cdn.discordapp.com/emojis/706499634083659827.png"
          )
          .setTitle("Something went wrong!")
          .setColor("#ff4a4a")
          .setDescription(`\`\`\`js\n${error.message}\n\`\`\``);

        message.reply({ embeds: [err] });
        console.log(e);
      }
    }
  },
});
