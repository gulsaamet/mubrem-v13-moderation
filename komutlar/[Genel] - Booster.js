const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!message.member.roles.cache.has(ayarlar.booster) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle booster olmalısın.`)] })
    let name = args.slice(0).join(' ');
    let guild = client.guilds.cache.get(ayarlar.guildid)
    if (!name) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı adı giriniz!`)] })
    if (name.length > 32) message.reply({ embeds: [embed.setDescription(`Öncelikle **32** karakteri geçmeyen bir isim belirtiniz!`)] })
    guild.members.cache.get(message.author.id).setNickname(name).then(x => message.reply({ embeds: [embed.setDescription(`Kullanıcı adın başarıyla \`${name}\` olarak değiştirildi!`)] }))
  

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["zengin","nick"]
  }
  exports.help = {
      name: "booster"
  }