const Command = require("../base/Command.js");
const Discord = require("discord.js")
const { MessageMenuOption,  MessageMenu, MessageActionRow } = require("discord-buttons");
class eglence extends Command {
    constructor(client) {
        super(client, {
            name: "eglence",
            aliases: ["eglence"]
        });
    }

    async run(message, args, client) {
        if(!this.client.config.botOwners.includes(message.author.id)) return


        const noa = new MessageMenuOption()
        .setLabel('Vampir Köylü')
        .setEmoji('🧛')
        .setValue('vk')
        .setDescription('Vampir Köylü')
  
        const noa1 = new MessageMenuOption()
        .setLabel('Soru - Cevap')
        .setEmoji('❔')
        .setValue('sc')
        .setDescription('Soru - Cevap')

        const noa2 = new MessageMenuOption()
        .setLabel('Gartic.io')
        .setEmoji('📝')
        .setValue('gc')
        .setDescription('Gartic.io')
        
    const select = new MessageMenu()
        .setID('select1')
        .setPlaceholder('Eğlence Rolünüzü Seçin')
        .addOption(noa)
        .addOption(noa1)
        .addOption(noa2)
  
  
     const Row1 = new MessageActionRow()
     .addComponent(select)   
    
    await message.channel.send('Eğlence Rolünüzü Seçin', { components: [Row1] });
}

}
module.exports = eglence;
