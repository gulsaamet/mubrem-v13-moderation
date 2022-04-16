const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require(`../ayarlar.json`)

exports.run = async (bot, message, args) => {
	
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
let prefix = ayarlar.prefix
let sk = message.mentions.channels.first();
let kanal = await db.fetch(`sk_${message.guild.id}`)
  
if (args[0] === "sıfırla" || args[0] === "kapat") {
if(!kanal) return message.channel.send(`Seviye kanal sistemini kapatmak için \`seviye kanalının\` seçili olması lazım örnek kullanım: \`${prefix}seviye-kanal #kanal\``);
    
db.delete(`sk_${message.guild.id}`)
  
message.channel.send(`Seviye kanalı başarıyla kapatıldı.`);
 
  
    return
  }
  
if (!sk) return message.channel.send( `Seviye kanalını bulamadım. Kullanım ${prefix}seviye-kanal #kanal`);
 

db.set(`sk_${message.guild.id}`, sk.id)

message.channel.send(`Seviye kanalı ${sk} olarak ayarlandı\nSıfırlamak için ${prefix}seviye-kanal sıfırla`);





};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['seviye-kanal'],
      kategori: "seviye",
    permLevel: 3
  };
  
exports.help = {
    name: 'seviye-kanal',
    description: 'Seviye kanalını ayarlar',
    usage: 'seviye-kanal',
    emoji: "ℹ"
  };