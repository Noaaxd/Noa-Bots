const Command = require("../base/Command.js");
const Discord = require("discord.js")
const { MessageMenuOption,  MessageMenu, MessageActionRow } = require("discord-buttons");
class oyun extends Command {
    constructor(client) {
        super(client, {
            name: "oyun",
            aliases: ["oyun"]
        });
    }

    async run(message, args, client) {
        if(!this.client.config.botOwners.includes(message.author.id)) return


        const noa = new MessageMenuOption()
        .setLabel('Among Us')
        .setEmoji('🔴')
        .setValue('amongus')
        .setDescription('Among Us')
  
        const noa1 = new MessageMenuOption()
        .setLabel('League of Legends')
        .setEmoji('🟡')
        .setValue('lol')
        .setDescription('League of Legends')

        const noa2 = new MessageMenuOption()
        .setLabel('Counter Strike')
        .setEmoji('🟢')
        .setValue('cs')
        .setDescription('Counter Strike')

        const noa3 = new MessageMenuOption()
        .setLabel('Minecraft')
        .setEmoji('🔵')
        .setValue('minecraft')
        .setDescription('Minecraft')

        const noa4 = new MessageMenuOption()
        .setLabel('Fortnite')
        .setEmoji('🟠')
        .setValue('fortnite')
        .setDescription('Fortnite')

        const noa5 = new MessageMenuOption()
        .setLabel('Grand Theft Auto V')
        .setEmoji('🟣')
        .setValue('gta')
        .setDescription('Grand Theft Auto V')

        const noa6 = new MessageMenuOption()
        .setLabel('Rust')
        .setEmoji('🟣')
        .setValue('rust')
        .setDescription('Rust')
        
    const select = new MessageMenu()
        .setID('select1')
        .setPlaceholder('Oyun rollerinizi seçin')
        .addOption(noa)
        .addOption(noa1)
        .addOption(noa2)
        .addOption(noa3)
        .addOption(noa4)
        .addOption(noa5)
        .addOption(noa6)
  
  
     const Row1 = new MessageActionRow()
     .addComponent(select)   
    
    await message.channel.send('Oyun rollerini seç', { components: [Row1] });
}

}
module.exports = oyun;
