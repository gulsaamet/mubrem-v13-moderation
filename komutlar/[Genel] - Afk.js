const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
  var kullanıcı = message.author;
  var sebep = args.slice(0).join("  ");
  
    if (!sebep) return message.channel.send({ content: `**AFK Moduna Geçmek İçin Bir Sebep Belirtmelisin!**`}).catch(e => {})



    await message.react(ayarlar.yes)
  
         message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(e => {})
         db.set(`afktag_${message.author.id}`, message.member.displayName);
         db.set(`afk_${kullanıcı.id}`, sebep);
         db.set(`afk_süre_${kullanıcı.id}`, Date.now());

         let dcs16 = new MessageEmbed()
        .setThumbnail(message.guild.iconURL())
        .setDescription(`Başarıyla \`AFK\` Moduna Girdiniz, Her Hangi Bir Şey Yazana Kadar AFK Sayılacaksın.`)
        .setColor("GREEN")
        .setTimestamp()
       message.channel.send({ embeds: [dcs16] }).catch(e => {})
    

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["afk"]
  }
  exports.help = {
      name: "afk"
  }