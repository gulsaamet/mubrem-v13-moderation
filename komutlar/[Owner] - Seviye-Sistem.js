const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message) => {
  
  if(!message.member.permissions.has("BAN_MEMBERS")) return channel.send(new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."))

  let prefix = ayarlar.prefix
  let args = message.content.split(' ').slice(1);
  const secenekler = args.slice(0).join(' ');

  if(secenekler.length < 1) return message.reply(`**${prefix}seviye-sistem aç** veya **${prefix}seviye-sistem kapat** yazınz `);

  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off") return message.reply(`**${prefix}seviye-sistem aç** veya **${prefix}seviye-sistem kapat** yazınz `)
  
  if (secenekler === "aç" || secenekler === "on") {
    
    var i = db.set(`lvll_${message.guild.id}`, "acik")
    
      const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`Seviye Sistem Başarıyla açıldı\nSeviye sistemini kapatmak isterseniz **${prefix}seviye-sistem kapat** yazmanız yeterlidir.`)
    message.channel.send({embeds : [embed]})

  };

  if (secenekler === "kapat" || secenekler === "off") {
    
    db.delete(`lvll_${message.guild.id}`)
    
    message.channel.send('Seviye sistemi kapatıldı.')

  };
}

exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: [],
		permLevel: 4,
    kategori: "seviye",
	};

exports.help = {
  name: 'seviye-sistem',
  description: 'seviye-sistem aç kapat.',
  usage: 'seviye-sistem',
  emoji: "ℹ"
};