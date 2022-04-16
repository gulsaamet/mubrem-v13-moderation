const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {
  let prefix = ayarlar.prefix
  if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has(8)) 
  return message.reply({embeds:[
     new Discord.MessageEmbed()
       .setColor('RANDOM')
       .setTimestamp()
       .setDescription('Bu komutu kullanabilmek için `MESAJLARI_YÖNET` iznine sahip olmalısın!')]});

if(isNaN(args[0])) {
  var errembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField(`Yanlış Kullanım!`, `Bir rakam yazmalısın!`)
    .addField(`Doğru Kullanım:`, `${prefix}sil <temizlenecek mesaj sayısı>`)
return message.channel.send({embeds:[errembed]});
}

if (args[0] < 1) return message.reply({embeds:[
   new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTimestamp()
     .setDescription("**1** adetten az mesaj silemem!")]})
if (args[0] > 100) return message.reply({embeds:[
   new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTimestamp()
     .setDescription("**100** adetten fazla mesaj silemem!")]})

message.channel.bulkDelete(args[0]).then(deletedMessages => {
if (deletedMessages.size < 1) return message.reply({embeds:[
    new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTimestamp()
     .setDescription(" Hiç mesaj silemedim! _(**14** günden önceki mesajları silemem!)_")]});
})
message.channel.send({embeds:[
    new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTimestamp()
     .setDescription(`**${args[0]}** adet mesaj başarıyla silindi!`)]}).then((message) => setTimeout(() => message.delete(), 5000));;
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sil","clear","temizle"],
    permLevel: `Mesajları yönet yetkisine sahip olmak gerekir.`
  };
  
  exports.help = {
    name: 'sil',
    category: 'moderasyon',
    description: 'Belirtilen miktarda mesaj siler.',
    usage: '.sil <miktar>',
    emoji: "ℹ"
  };