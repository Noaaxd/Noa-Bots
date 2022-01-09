const Config = require('../config.json');
const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
let NoaEmbed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(Config.Footer, message.guild.iconURL({dynamic: true}))
.setColor(Config.embedColor)


let NoaRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]); 
if (!NoaRole) return message.channel.send(NoaEmbed.setDescription(`${Config.false} Geçerli bir rol belirtmeli/Rol ID'si girmelisin.`))

  
let satArray = new Array();
let NoacimÜyeler = NoaRole.members.forEach(Noacim => {satArray.push(`<@!${Noacim.id}> ( \`${Noacim.id}\` )`);})


message.channel.send(NoaEmbed.setDescription(`
${NoaRole} (\`${NoaRole.id}\`) adlı role ait bilgiler aşağıda verilmiştir.

${Config.Emoji} **Rol Rengi:** \`${NoaRole.hexColor}\`
${Config.Emoji} **Rol ID'si:** \`${NoaRole.id}\` 
${Config.Emoji} **Roldeki Kişi Sayısı**: \`${NoaRole.members.size}\`


**Roldeki kişiler:**

${NoaRole.members.size <= 15 ? satArray.join("\n") : `Bulamadım. ( **${NoaRole.members.size}** kişi var! )`}
`))
  
};

module.exports.config = {
    name: "rolbilgi",
    description: "Rolün infolarını atar",
    usage: "rolbilgi",
    guildOnly: false,
    enabled: true,
    aliases: ["rb", "rolinfo","rol-bilgi"],
  };
