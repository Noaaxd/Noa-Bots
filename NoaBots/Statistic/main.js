const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
const { Database } = require("ark.db");
global.confdb = new Database("./src/configs/config.json");
const rankdb = global.rankdb = new Database("./src/configs/ranks.json");
client.commands = new Collection();
client.cooldown = new Map();
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
client.tasks = rankdb.get("tasks") || [];
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client.on("ready", async () => {
  client.user.setPresence({activity: {name: ''}, status: 'dnd'});
  let botVoiceChannel = client.channels.cache.find(channel => channel.name === "");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});

client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot noa't connected!"));
