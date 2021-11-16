const Event = require("../structures/events");

module.exports = new Event("ready", (client) => {
  console.log(`${client.user.username} is available now!`);
  (activities = [
    `📡 ${client.guilds.cache.size} servers 🛰️`,
    `👩🏻 ${client.users.cache.size} users! 👦🏻`,
  ]),
    (i = 0);
  setInterval(
    () =>
      client.user.setActivity(
        `Prefix [;] | ${activities[i++ % activities.length]}`,
        { type: "LISTENING" }
      ),
    5000
  );
});
