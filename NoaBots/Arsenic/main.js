const {
    Client
} = require('discord.js');
const client = new Client();
const request = require('request');
let Options = {
    "Vanity_URL": "",
    "Developer": [""],
    "Prefix":"noa.",
    "Bot_Token": ""
};
client.on("ready", async () => {
    client.user.setPresence({ activity: { name: "" }, status: "dnd" });
  });
  
client.on('guildUpdate', async (oldGuild, newGuild) => {
    if (oldGuild.vanityURLCode === newGuild.vanityURLCode) return;
    let entry = await newGuild.fetchAuditLogs({
        type: 'GUILD_UPDATE'
    }).then(audit => audit.entries.first());
    if (!entry.executor || entry.executor.id === client.user.id) return;
    let channel = client.channels.cache.find(x => x.name == "arsenic-log")
    if (channel) channel.send(`🛡️ ${entry.executor} ${entry.executor.id} Sunucunun Özel Urlsini Değiştirmeye Çalıştı, @everyone`)
    if (!channel) newGuild.owner.send(`🛡️ ${entry.executor} ${entry.executor.id} Sunucunun Özel Urlsini Değiştirmeye Çalıştı, @everyone`)
    newGuild.members.ban(entry.executor.id, {
        reason: `Url Guard | Noâ.`
    });
    const settings = {
        url: `https://discord.com/api/v6/guilds/${newGuild.id}/vanity-url`,
        body: {
            code: Options.Vanity_URL
        },
        json: true,
        method: 'PATCH',
        headers: {
            "Authorization": `Bot ${Options.Bot_Token}`
        }
    };
    request(settings, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
});
client.on("message", async message => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(Options.Prefix)) return;
    if (message.author.id !== Options.Developer && message.author.id !== message.guild.owner.id) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(Options.Prefix.length);
    
  ///--------------------------------- Eval Command ---------------------------------///
  
    if (command === "eval" && message.author.id === Option.Developer) {
      if (!args[0]) return message.channel.send(`Kodu Belirtmelisin!`);
        let code = args.join(' ');
        function clean(text) {
        if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
        text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
      };
      try { 
        var evaled = clean(await eval(code));
        if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
        message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
      } catch(err) { message.channel.send(err, {code: "js", split: true}) };
    };
  
    ///--------------------------------- Güvenli Ekleme Fonksiyonu ---------------------------------///
  
      if(command === "restart" || command === "reboot") {
          message.channel.send("Bot yeniden başlatılıyor").then(msg => {
              console.log("[BOT] Yeniden başlatılıyor");
              process.exit(0);
          });
      
    };
  });

  client.on("disconnect", () => console.log("Bot bağlantısı kesildi"))
  client.on("reconnecting", () => console.log("Bot tekrar bağlanıyor..."))
  client.login(Options.Bot_Token).then(x => console.log(`${client.user.tag} Bot Aktif`)).catch(err => console.error(`Bota Giriş Yapılamadı.!\n ∞ Hata : ${err}`))