const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")] })
    var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
    let total = db.get(`subs_${message.author.id}`) || 0;
    if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] })
    if (member.id === message.author.id) return message.reply({ embeds: [embed.setDescription("Kendine yetkili rolleri veremezsin!")] })
    
    guild.members.cache.get(member.id).roles.add(ayarlar.baslangicYT);
    message.reply({ embeds: [embed.setDescription(`${member} kullanıcısına <@&${ayarlar.baslangicYT}> rolleri verildi.`)] });
    
    client.channels.cache.get(ayarlar.chat).send({ content: `${member} kullanıcısı sunucumuzda yetkili oldu, aramıza hoş geldin.` })
    client.channels.cache.get(ayarlar.rolLog).send({ content: `${member} - \`(${member.id})\` kullanıcısına \`(${message.author.id})\` tarafından **YETKİLİ** rolleri verildi.` });


    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yt-ver","yetkiliyap","yetkili-yap"]
  }
  exports.help = {
      name: "Yetkili-Yap"
  }