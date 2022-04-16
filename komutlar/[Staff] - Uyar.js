const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!message.member.roles.cache.has(ayarlar.ortaYönetim) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.`)] })
        const member =  message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const reason = args.splice(1).join(" ")
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin.")] })
        if (!reason) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir sebep belirtmelisin.")] })
        if (!message.member.permissions.has(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini uyaramazsın!")] })
        db.push(`warns_${member.id}`, `${message.author} tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle uyarılmış.`)
        db.push(`sicil_${member.id}`, `${message.author} tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle uyarılmış.`)
        db.add(`warn_${member.id}`, 1)
        db.add(`warnver_${message.author.id}`, 1)
        db.add(`ceza_${guild.id}`, 1)
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı **"${reason}"** sebebiyle ${message.author} tarafından uyarıldı. \`(Ceza ID: #${db.fetch(`ceza_${guild.id}`)})\``)] })
        const user = client.users.cache.get(member)
        client.channels.cache.get(ayarlar.warnLog).send({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından uyarıldı.
      
        Ceza ID: \`#${db.fetch(`ceza_${guild.id}`)}\`
        Uyarılan Kullanıcı: ${member} - \`(${member.id})\`
        Uyaran Yetkili: ${message.author} - \`(${message.author.id})\`
        Uyarı Sebebi: \`${reason}\`
        Uyarılma Tarihi: \`${moment(Date.now()).format("LLL")}\`` )]}

        )};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["warn"]
  }
  exports.help = {
      name: "Uyar"
  }