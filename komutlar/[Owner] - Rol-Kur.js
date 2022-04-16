const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('rol1')
                .setLabel('Hammer Rol')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('rol2')
                .setLabel('Punishment Rol')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('rol3')
                .setLabel('Staff Rol')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('iptal')
                .setLabel('İptal')
                .setStyle('DANGER')
                .setDisabled(true)

        );

    let msg = await message.reply({
        content: `**${message.guild.name}** sunucusu \`ROL-KUR\` sistemi. İstediğiniz rolleri kurmak için aşağıdaki butonlara tıklamanız yeterli.
\`\`\`Hammer ROL → Hammer rollerini kurar, ve renklerini ayarlar.
Punishment ROL → Punishment rollerini kurar, ve renklerini ayarlar.
Staff ROL → Staff rollerini kurar, ve renklerini ayarlar.
İptal → İşlemi iptal eder.\`\`\`
            `, components: [row]
    });


    const filter = (i) => i.user.id === message.author.id

    const collector = await msg.channel.createMessageComponentCollector({ filter, max: 1 })

    collector.on("collect", async (button) => {

        if (button.customId === "rol1") {

            message.guild.roles.create({name: 'Ban Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Jail Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Transport Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Mute Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'V.Mute Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Bot Commands', color: '#7473ec'})

            await button.reply({ content: `Sunucu Hammer Rolleri Başarıyla Kuruldu. ${ayarlar.yes}`, ephemeral: false })
        }

  

    if (button.customId === "rol2") {

        message.guild.roles.create({name: 'Jail', color: '#ff0000'})
        message.guild.roles.create({name: 'Muted', color: '#ff0000'})
        message.guild.roles.create({name: 'V.Muted', color: '#ff0000'})
        message.guild.roles.create({name: 'Şüpheli Hesap', color: '#ff0000'})
        message.guild.roles.create({name: 'Reklam', color: '#ff0000'})

        await button.reply({ content: `Punishment Rolleri Başarıyla Kuruldu. ${ayarlar.yes}`, ephemeral: false })
    }
    if (button.customId === "rol3") {

        message.guild.roles.create({name: 'Staf Role 1', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 2', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 3', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 4', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 5', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 6', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 7', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 8', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 9', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role 10', color: '#23b8bd'})


        await button.reply({ content: `Staff Rolleri Başarıyla Kuruldu. ${ayarlar.yes}`, ephemeral: false })
    }
})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rol-kur","rolkur"]
}
exports.help = {
    name: "Rol Kur"
}