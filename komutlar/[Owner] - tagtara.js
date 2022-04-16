const Discord = require("discord.js")
const ayarlar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için geçerli yetkin olmalı.")]})

const cst = args.slice(0).join(" ")
if(!cst) return message.reply({ embeds: [embed.setDescription(`Lütfen bir tag belirt.`)] })
const sonuc = message.guild.members.cache.filter(mr => mr.user.username.includes(cst)).size
const sonuc2 = message.guild.members.cache.filter(mr => mr.user.discriminator.includes(cst)).size
const sonucc = sonuc + sonuc2

let cse = new Discord.MessageEmbed()
      .setDescription(`**${message.guild.name}** sunucusunda belirtilen taga ait sunucuda **`+sonucc+`** üye var.`)
      .setFooter(`mubrem was here.`)
      .setTimestamp()
      .setColor('BLACK')
    message.channel.send({embeds: [cse]}).catch(e => {})
}
module.exports.conf = {
aliases: ["tagtara"]
}

module.exports.help = {
name: "tag-info"
}