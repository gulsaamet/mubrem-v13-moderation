const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
   
    let bg = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
        if (args[0] == "ver") {
            bg.forEach(r => {
                r.roles.add(ayarlar.unregister)
                r.setNickname('• Kayıtsız')
            });
            message.reply({ embeds: [embed.setDescription("Sunucuda rolü olmayan \`"+ bg.size +"\` kişiye kayıtsız rolü verildi.")] })
        } else if (!args[0]) {
            message.reply({ embeds: [embed.setDescription("Sunucumuzda rolü olmayan \`"+ bg.size +"\` kişi var.")] })
        }
    

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rolsüz","rkontrol"]
  }
  exports.help = {
      name: "rolsüz"
  }