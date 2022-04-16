
const db = require('quick.db');
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
const ayarlar = require('../ayarlar.json')

const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');

module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    if (!message.member.roles.cache.has(ayarlar.muteHammer) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] })
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()

    if (!user) return message.reply({ embeds: [embed.setDescription('Öncelikle susturulması kaldırılacak kullanıcıyı belirtmelisin!')] })
    await guild.members.cache.get(user.id).roles.remove(ayarlar.muteRol);
    message.reply({ embeds: [embed.setDescription(`${user} kullanıcısının susturulması ${message.author} tarafından kaldırıldı.`)] })
    client.channels.cache.get(ayarlar.muteLog).send({ embeds: [embed.setDescription(`     
    ${user} kullanıcısının susturulması kaldırıldı.
         
    Kullanıcı: ${user} - \`(${user.id})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)] }); 
      db.set(`mute_${user.id}`, false)
  

  }
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['unmute','cunmute',"chatunmute"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'unmute',
    description: 'unmute',
    usage: '',
    emoji: "ℹ"
  };