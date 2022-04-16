const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has(8))
    return message.channel.send({embeds: [
      new Discord.MessageEmbed()
        .setColor("#ff0000")
        .addFields({
          name: "Hata", 
         value: `•\`sohbet-aç\`Komutunu kullanabilmek için , \`Kanalları Yönet\` **Yetkisine sahip olmanız gerekir**.`
        })
        .setImage(
          "https://cdn.discordapp.com/attachments/872871069973880833/945372009410482236/unknown.png"
        )
        ]});



  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
  message.channel.permissionOverwrites.create(every, {
    SEND_MESSAGES: false
  });

  const yazı = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setTimestamp()
   .setDescription('**Sohbet Kanalı `Yazılamaz` Durumuna Getirilmiştir.**')

   message.channel.send({embeds:[yazı]});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kapat","kanal","kanalkaat","kanal-kapat","kilitkapat","kilit-kapat"],
  permLevel: 0
};

exports.help = {
  name: 'sohbet-kapat',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: '.sohbet-kapat',
  emoji: "ℹ"
};