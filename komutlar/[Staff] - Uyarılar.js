const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!message.member.roles.cache.has(ayarlar.ortaYönetim) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.`)] })
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin.")] })
        const warns = await db.fetch(`warns_${member.id}`)
        if (!warns) return message.reply({ embeds: [embed.setDescription("Bu kullanıcının veri tabanında daha önceden uyarı verisi bulunmamakta.")] })
        message.reply({ embeds: [embed.setDescription(`${warns.map((data) => `${data}`).join("\n")}`)] })
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["warn-list","uyarılar","uyarı-liste","warnlist"]
  }
  exports.help = {
      name: "uyarılar"
  }