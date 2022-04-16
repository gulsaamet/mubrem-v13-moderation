const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const ayarlar = require('../ayarlar.json')
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")

exports.run = async (client, message, args) => {
    
    let csm = message.mentions.members.first() || message.member
  
    const a = "`"
    let csd = message.guild.members.cache.filter(mr => mr.joinedTimestamp < csm.joinedTimestamp).size + 1
  
    let cse = new MessageEmbed()
      .setTitle(a + csm.user.tag + a + " User Info")
      .setFooter(`mubrem was here.`)
      .setThumbnail(csm.user.avatarURL())
      .setColor("BLUE")
      .addField("Kullanıcı İsmi", a + csm.user.username + a)
      .addField("ID", a + csm.user.id + a)
      .addField("Hesap Oluşturulma Tarihi", "<t:"+csm.user.createdTimestamp+":F>")
      .addField("Sunucuya Katılma Tarihi", "<t:"+csm.joinedTimestamp+":F>")
      .addField("Sunucuya Katılma Sırası", a + csd + a)
      .addField("Roller", `**Rol Sayısı: ${a + csm.roles.cache.size + a}\nRol İsimleri: ${csm.roles.cache.map(cs => cs).join(", ")}**`)
      .setTimestamp()
    message.channel.send({embeds: [cse]}).catch(e => {})
  
    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kb","me","kbilgi","profil"]
  }
  exports.help = {
      name: "kullanıcı-bilgi"
  }