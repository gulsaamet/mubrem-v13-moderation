const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için geçerli yetkin olmalı.")]})
message.channel.clone().then(kanal=> {
  let position = message.channel.position;
  kanal.setPosition(position);
  message.channel.delete();
  kanal.send({embeds: [new MessageEmbed().setDescription(`Kanal Başarıyla Yeniden Oluşturuldu.`).setFooter(`Kanalı Nukeleyen Kişi : ${message.author.tag}`)]})
});
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nuke","nuk","nk"],
  permLevel: 0
};

exports.help = {
    name: 'nuke',
    description:"Kullanılan kanalı yeniden oluşturur."
};