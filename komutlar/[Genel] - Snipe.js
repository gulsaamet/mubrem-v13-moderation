const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');

exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let hembed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RED')
    let embed = new MessageEmbed().setColor('#2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RED')
    let mesaj = await db.get(`snipe.${message.guild.id}.${message.channel.id}`);
    if (!mesaj) {
        
        return message.reply({ embeds: [hembed.setDescription(`Bu kanalda silinmiş bir mesaj bulunmamakta!`)] })
    }
    if (mesaj.icerik.toLowerCase().includes('discord.gg/') || mesaj.icerik.toLowerCase().includes('https') || mesaj.icerik.toLowerCase().includes('http') || mesaj.icerik.toLowerCase().includes('.com')) {
        
        return message.reply({ embeds: [hembed.setDescription(`Son silinen mesajda reklam bulunmakta!`)] })
    }
    let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
    if (mesaj.icerik) {
        return message.reply({ embeds: [embed.setDescription(`
    Mesaj sahibi: ${mesajYazari ? mesajYazari : mesajYazari.tag} ( \`${mesajYazari.id}\` )
    Mesajın silinme tarihi: \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 
    
    Silinen Mesaj: \`${mesaj.dosya ? "Atılan mesaj bir dosya içeriyor." : mesaj.icerik}\`
    `)] });
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["snipe"]
  }
  exports.help = {
      name: "snipe"
  }