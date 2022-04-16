const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")
exports.run = async(client, message, args) => {
    let tik = ayarlar.yes 
    let duyuru = ayarlar.beyazyildiz
    let zil = ayarlar.simsek
    const kanal = ayarlar.jailLog
    const rol = ayarlar.jailRol
    const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({
                name: message.member.displayName, 
                iconURL: client.user.displayAvatarURL({	dynamic: true,	})	})
            .setTimestamp()
    if (!message.member.permissions.has("KICK_MEMBERS") && !message.member.roles.cache.has(ayarlar.jailHammer)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için \`ÜYELERİ_AT\` yetkin olmalı!`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const jailKontrol = ayarlar.jailLog
    const jailKontrol2 = ayarlar.jailRol
    if(!jailKontrol && !jailKontrol2) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için jail-sistemini ayarlaman lazım.")]}) 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle kullanıcıyı belirtmelisin.")] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!member.roles.cache.get(rol)) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı zaten cezalandırılmamış.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    try {
    await member.roles.remove(rol)
    await message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından karantinadan alındı.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    await message.react(ayarlar.yes)
    await client.channels.cache.get(kanal).send({ embeds: [
        embed.setDescription(`     
    Birisi karantinadan çıkartıldı!
   ${ayarlar.simsek} **Kullanıcı**: ${member ? member.toString() : ""} - \`(${member.id})\`
   ${ayarlar.simsek} **Yetkili**: ${message.author} - \`(${message.author.id})\`
   ${ayarlar.simsek} **Tarih**: \`${moment(Date.now()).format("LLL")}\`

    `)]})
} catch {
    }
   
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hapis-çıkar'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'unjail',
    description: 'jailcik',
    usage: '',
    emoji: "ℹ"
  };