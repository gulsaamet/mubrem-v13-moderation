const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için geçerli yetkin olmalı.")]})
if(args[0] === "ver"){
    let x = message.guild.channels.cache.get(args[1])
if(!x){
return message.channel.send("Toplu rol vermek istediğin üyelerin bulunduğu kanalı etiketle!")}
x.members.map(a => {
 a.roles.add(ayarlar.katıldıRol)})
message.channel.send(`Toplantıda bulunan tüm yetkililere katıldı rolü dağıtılmaya başlandı.`)///.then(m =>m.delete(5000))
}if(args[0] === "al"){
        message.guild.roles.cache.get(ayarlar.katıldıRol).members.forEach(async uye => await uye.roles.remove(ayarlar.katıldıRol));
        message.channel.send('Katıldı rolleri alındı!');
      };
    
}
exports.conf = {
  aliases:["katıldı"]
};

exports.help = {
  name:'toplantı-katıldı'
}