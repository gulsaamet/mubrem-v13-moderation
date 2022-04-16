const Discord = require('discord.js')
const db = require("quick.db");

exports.run = async (client ,message, args) =>{

   if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription('Bu komudu kullanabilmek için `ÜYELERİ_BANLA` yetkisine sahip olman gerek.')]})
   if (!args[0]) return message.channel.send({embeds:[
            new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription(`Lütfen **aç** ya da **kapat** Yazın!`)]})
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send({embeds:[
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTimestamp()
                .setDescription(`Lüten **aç** ya da **kapat** Yazın!`)]})
  
  if(args[0] === 'aç') {
    let acikmi = await db.fetch(`${message.guild.id}.kufur`)
    if(acikmi == "acik") return message.channel.send({embeds:[
      new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTimestamp()
                .setDescription('Reklam Filtresi zaten açık ki!')]})
    db.set(`${message.guild.id}.kufur`, 'acik')
    message.channel.send({embeds:[
              new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription('Küfür filtresi Başarılı Şekilde Aktif Edildi. Bot `ÜYELERİ_BANLA` yetkisi Olanların Mesajını Silmeyecektir.')]})

}

  if (args[0] === 'kapat') {
    if(db.has(`${message.guild.id}.kufur`)){
    db.delete(`${message.guild.id}.kufur`, 'acik')
  message.channel.send({embeds:[
              new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setTimestamp()
              .setDescription(`Küfür Filtresini başarıyla Kapattım.`)]})
} else return message.channel.send({embeds:[
  new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTimestamp()
  .setDescription(`Küfür Filtresi zaten ayarlanmamış!`)]})
  }
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['küfürengel','küfür-engel','küfür'],
 permLevel: 0
};

exports.help = {
 name: 'küfür-ayarla',
 description: 'Küfür sistemini aktifleştirir',
 usage: 'küfür-engel'
};