const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('log1')
                .setLabel('Backup Log')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('log2')
                .setLabel('Guard Log')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('log3')
                .setLabel('Server Log')
                .setStyle('SUCCESS'))

    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('log4')
                .setLabel('Member Log')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('log5')
                .setLabel('Owner log')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('iptal')
                .setLabel('İptal')
                .setStyle('DANGER')
                .setDisabled(true)

        );

    let msg = await message.reply({
        content: `**${message.guild.name}** sunucusu \`LOG-KUR\` sistemi. İstediğiniz logları kurmak için aşağıdaki butonlara tıklamanız yeterli.
\`\`\`Backup Log → Backup log kanallarını kurar.
Guard Log → Guard log kanallarını kurar.
Server Log → Server log kanallarını kurar.
Member Log → Member log kanallarını kurar.
Owner Log → Owner log kanallarını kurar.
İptal → İşlemi iptal eder.\`\`\`
            `, components: [row, row2]
    });


    const filter = (i) => i.user.id === message.author.id

    const collector = await msg.channel.createMessageComponentCollector({ filter, max: 1 })

    collector.on("collect", async (button) => {

        if (button.customId === "log1") {

            message.guild.channels.create(`Mubrem Backup Log's`, { type: 'GUILD_CATEGORY' }).then(parent => {
                message.guild.channels.create('Channel-Backup-Log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('Role-Backup-Log', { type: 'text' }).then(c => c.setParent(parent.id))
            })
            await button.reply({ content: `Backup Log Kanalları Başarıyla Oluşturuldu, Kanallar #Mubrem Backup Log's kategorisi altında. ${ayarlar.yes}`, ephemeral: false })
        }



        if (button.customId === "log2") {

            message.guild.channels.create(`Mubrem Guard Log's`, { type: 'GUILD_CATEGORY' }).then(parent => {
                message.guild.channels.create('Channel-Log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('Role-Log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('Emojis-Log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('Webhook-Log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('Bot-Log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('Member-Kick-Log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('Member-Ban-Log', { type: 'text' }).then(c => c.setParent(parent.id))
            })
            await button.reply({ content: `Guard Log Kanalları Başarıyla Oluşturuldu, Kanallar #Mubrem Guard Log's kategorisi altında. ${ayarlar.yes}`, ephemeral: false })
        }

        if (button.customId === "log3") {

            message.guild.channels.create(`Mubrem Server Log's`, { type: 'GUILD_CATEGORY' }).then(parent => {
                message.guild.channels.create('ban-log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('jail-log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('mute-log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('warn-log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('voice-log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('message-log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('tag-log', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('penalties-log', { type: 'text' }).then(c => c.setParent(parent.id))
            })
            await button.reply({ content: `Server Log Kanalları Başarıyla Oluşturuldu, Kanallar #Mubrem Server Log's kategorisi altında. ${ayarlar.yes}`, ephemeral: false })
        }
        if (button.customId === "log4") {

            message.guild.channels.create(`Mubrem Member Log's`, { type: 'GUILD_CATEGORY' }).then(parent => {
                message.guild.channels.create('SetNickname', { type: 'text' }).then(c => c.setParent(parent.id))
                message.guild.channels.create('SetAvatar', { type: 'text' }).then(c => c.setParent(parent.id))
            })
            await button.reply({ content: `Member Log Kanalları Başarıyla Oluşturuldu, Kanallar #Mubrem Member Log's kategorisi altında. ${ayarlar.yes}`, ephemeral: false })
        }
        if (button.customId === "log5") {

            message.guild.channels.create(`Mubrem Owner Log's`, { type: 'GUILD_CATEGORY' }).then(parent => {
                message.guild.channels.create('ne bilim dursun aq', { type: 'text' }).then(c => c.setParent(parent.id))
            })
            await button.reply({ content: `Owner Log Kanalları Başarıyla Oluşturuldu, Kanallar #Mubrem Owner Log's kategorisi altında. ${ayarlar.yes}`, ephemeral: false })
        }

        if (button.customId === "iptal") {

            await button.reply({ content: `${ayarlar.no} işlem başarıyla iptal edildi.`, ephemeral: false })
        }
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["logkur","log-kur"]
}
exports.help = {
    name: "Log Kur"
}