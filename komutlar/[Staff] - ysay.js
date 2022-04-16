const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı")] })
    let yetkili = message.guild.roles.cache.get(ayarlar.botCommands);  


    let ses = message.guild.members.cache.filter(kullanici => kullanici.roles.highest.position >= yetkili.position && kullanici.voice.channel && !kullanici.user.bot && kullanici.presence && kullanici.presence.status !== "offline"); 
    let ses2 = message.guild.members.cache.filter(kullanici => kullanici.roles.highest.position >= yetkili.position && !kullanici.voice.channel && !kullanici.user.bot && kullanici.presence && kullanici.presence.status !== "offline"); 
  let kapalı = message.guild.members.cache.filter(m => !m.user.bot && m.presence && m.presence.status === "offline").size
  let dnd = message.guild.members.cache.filter(m => !m.user.bot && m.presence && m.presence.status === "dnd").size
  let online = message.guild.members.cache.filter(m => !m.user.bot && m.presence && m.presence.status === "online").size
  let idle = message.guild.members.cache.filter(m => !m.user.bot && m.presence && m.presence.status === "idle").size
  let toplam = message.guild.members.cache.filter(kullanici => kullanici.roles.highest.position >= yetkili.position && !kullanici.user.bot);
  
  message.channel.send(`\`\`\`| TOPLAM | AKTİF | KAPALI | SESTE | SESTE OLMAYAN |  \n---------------------------------------------------\n| ${toplam.size} kişi | ${dnd+online+idle} kişi | ${kapalı} kişi | ${ses.size} kişi | ${ses2.size} kişi | \`\`\``)
  message.channel.send(`\`\`\`Seste Olmayan Kişiler\n\n${ses2.map(y => y).join(',') || "HERKES SESTE"}\`\`\``)
    

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ysay","yetkili-say"]
  }
  exports.help = {
      name: "ysay"
  }