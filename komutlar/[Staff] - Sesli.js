const { Discord, MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.altYönetim) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
        let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
        let topses = message.guild.members.cache.filter(s => s.voice.channel);
        let yayın = topses.filter(s => s.voice.streaming);
        let mik = topses.filter(s => s.voice.selfMute).size;
        let kulak = topses.filter(s => s.voice.selfDeaf).size;
        let yetkili = message.guild.members.cache.filter(x => {
            return x.voice.channel && x.roles.cache.has(ayarlar.botCommands)
        }).size
        message.reply({ embeds: [embed.setDescription(`
\`•\` Sesli kanallarında **${sesli}** kullanıcı bulunuyor.
\`•\` Sesli kanallarında **${yetkili}** yetkili bulunuyor.
Mikrofonu kapalı: **${mik}**
Kulaklığı kapalı: **${kulak}**
Yayında: **${yayın.size}** 
    `)] });
      
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["voice","sesli-say","voice-info","vinfo","sesli"]
  }
  exports.help = {
      name: "sesli-bilgi"
  }