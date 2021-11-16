const Discord = require("discord.js");

const Client = require("./client");
/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} client
 * @param  {Discord.ClientEvents[K]}
 */
function RunFunction(client, ...eventargs) {}
/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
  /**
   *
   * @param {K} event
   * @param {RunFunction <K>} runFunction
   */
  constructor(event, runFunction) {
    this.event = event;
    this.run = runFunction;
  }
}

module.exports = Event;
