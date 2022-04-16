const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.banHammer) && !message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için geçerli yetkin olmalı.")]})
    let carpi = ayarlar.no
    let tik = ayarlar.yes 
    let duyuru = ayarlar.beyazyildiz
    let zil = ayarlar.simsek
    const banlogKontrol = ayarlar.banLog 
    const banRolKontrol = ayarlar.banHammer
    if(!banlogKontrol && !banRolKontrol) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için ban-log'u ayarlaman lazım.")]}) 
    const banLog = ayarlar.banLog
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let reason = args.slice(1).join(' ');
    if (!user) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription('Banlanacak kullanıcıyı belirtmelisin.')]})
    if (reason.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription('Geçerli bir sebep belirtmelisin.')]})
    if(user.id === message.author.id) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription('Kendini banlayamazsın.')]})
    if(user.id === client.user.id) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription('Özel Botları Banlayamazsın.')]})
    if(user.id === message.guild.ownerID) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription('Sunucu sahibi banlayamazsın.')]})
    if(user.roles.cache.has(ayarlar.banHammer) && user.permissions.has("BAN_MEMBERS")) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription('Bu kullanıcının yetkisi var!')]})
    if(user.roles.highest.position >= message.member.roles.highest.position)return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription(`${user} adlı kullanıcının yetkisi senden yüksek veya aynı pozisyondasınız.`)]})
    if(!user.bannable) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription(`${user} adlı kullanıcı banlayamıyorum.`)]})

  const log = new Discord.MessageEmbed()
  .setColor("RED")
  .setTimestamp()
  .setAuthor({name: message.member.displayName, iconUrl: message.author.avatarURL({ dynamic: true })})
  .setDescription(`
  ${user ? user.toString() : user.username} kişisi sunucudan banlandı!
  

  ${ayarlar.simsek} **Kullanıcı:** ${user.displayName} - ${user.id}
  ${ayarlar.simsek} **Yetkili:** ${message.member.displayName} - ${message.member.id}
  ${ayarlar.simsek} **Sebep:** ${reason}
  ${ayarlar.simsek} **Tarih:** ${moment(Date.now()).format("LLL")}
  
  `)
  
  try { 
  await user.ban({
  reason: `${reason}` })
   await message.channel.send((`**${user}** **(${user.id})** kullanıcısı **"${reason}"** sebebiyle sunucudan banlandı! \`(Ceza ID: #${db.fetch(`ceza_${guild.id}`)})\``))
  await message.react(tik)
    await client.channels.cache.get(banLog).send({embeds: [log]});      
        } catch {message.channel.send(`${user} adlı kullanıcıyı banlayamıyorum! ${client.emojis.cache.get(carpi)}`)}
   
  };
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yasakla",'yasak'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Ban atar',
  usage: '.ban @kullanıcı',
};