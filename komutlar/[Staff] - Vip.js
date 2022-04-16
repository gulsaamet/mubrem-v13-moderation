const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [embed.setDescription("Komutu kullanmak için geçerli yetkin olmalı!")] })
    var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
    if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] })
    if (member.id === message.author.id) return message.reply({ embeds: [embed.setDescription("Kendine bu rolü veremezsin!")] })
    
    guild.members.cache.get(member.id).roles.add(ayarlar.vipRole);
    message.reply({ embeds: [embed.setDescription(`${member} kullanıcısına <@&${ayarlar.vipRole}> rolü verildi.`)] });
    
    embed.setColor("e4b400")
    client.channels.cache.get(ayarlar.rolLog).send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${ayarlar.vipRole}> rolü verildi.
  
    \`Rolü Alan Kullanıcı:\` ${member} - (**${member.id}**)
    \`Rolü Veren Yetkili:\` ${message.author} - (**${message.author.id}**)
    \`Verilen Rol:\` <@&${ayarlar.vipRole}>     
    \`Rol Verilme Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });

    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["vip-ver"]
  }
  exports.help = {
      name: "vip"
  }