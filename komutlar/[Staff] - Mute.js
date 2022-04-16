
const db = require('quick.db');
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
const ayarlar = require('../ayarlar.json')

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    if (!message.member.roles.cache.has(ayarlar.muteHammer) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] })
    let member = message.mentions.members.first() || guild.members.cache.get(args[0]) 
    let reason = args.splice(2).join(" ")
    let sure = args[1]
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!member) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin.`)] })
    if (member.roles.cache.get(ayarlar.muteRol)) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı zaten susturulmuş.`)] })
    if (!sure) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir süre belirtmelisin.`)] })
    if (!reason) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir sebep belirtmelisin.`)] })
    sure
      .replace("s", " Saniye")
      .replace("m", " Dakika")
      .replace("h", " Saat")
      .replace("d", " Gün")
      .replace("w", "Hafta")
    if (ayarlar.muteLimit > 0 && limit.has(message.author.id) && limit.get(message.author.id) == ayarlar.muteLimit) return channel.send("Saatlik mute sınırına ulaştın!")
    if (!message.member.permissions.has(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini muteleyemezsin!")] })

    message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından **"${reason}"** sebebiyle **${sure}** boyunca susturuldu. \`(Ceza ID: #${db.fetch(`ceza_${guild.id}`)})\``)] })
    member.roles.add(ayarlar.muteRol)
    db.add(`ceza_${guild.id}`, 1)
    client.channels.cache.get(ayarlar.muteLog).send({ embeds: [embed.setDescription(`     
    ${member ? member.toString(): member.username} kullanıcısı susturuldu.
    Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
    Kullanıcı: ${member ? member.toString() : ""} - \`(${member.id})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Sebep: \`${reason}\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)] });
    db.push(`sicil_${member.id}`, `${message.author} tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **[MUTE]** cezası almış.`)
    db.add(`points_${member.id}`, ayarlar.mutePuan);
    db.set(`mute_${member.id}`, true);
    const cezaID = await db.fetch(`ceza_${guild.id}`)
    db.set(`${cezaID}`, `${message.author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle **[CHAT-MUTE]** cezası almış.`)
    setTimeout(() => {
      if (db.get(`mute_${member.id}`)) {
      member.roles.remove(ayarlar.muteRol)
      }
    }, ms(sure));
    if (ayarlar.muteLimit > 0) {
      if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
      else limit.set(message.author.id, limit.get(message.author.id) + 1);
      setTimeout(() => {
        if (limit.has(message.author.id)) limit.delete(message.author.id);
      }, 1000 * 60 * 60)
    }
  }
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mute","cmute","chatmute"]
  }
  exports.help = {
      name: "mute",
      help: ""
  }