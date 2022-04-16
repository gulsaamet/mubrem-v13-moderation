const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {


  message.channel.createInvite({maxAge: 0}).then(invite => {

    message.channel.send(`${ayarlar.yes} **Sana bu sunucu için bir link oluşturdum** → ${invite}`)

    

  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sd','sunucudavet','sunucu-davet','link'],
  permLevel: 0 //permLvl:0 = herkes kullanabilir.
};

exports.help = {
  name: 'davet',
  description: 'Kodun Kullanıldığı Sunucunun Davet Linkini Oluşturur. /davet-oluşturma yetkisi gereklidir',
  usage: 'davet'
};