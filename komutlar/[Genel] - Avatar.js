const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
        
        let member = message.mentions.members.first()
        let embed = new Discord.MessageEmbed()

        if(member){
            embed.setTitle(`${member.user.username} isimli kullanıcının avatarı:`).setImage(member.user.avatarURL({dynamic: true}))
        }else{
            embed.setTitle("Senin avatarın:").setImage(message.author.avatarURL({dynamic: true}))
        }
        message.channel.send({embeds: [embed]})
	},

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["avatar", "avatar"],
        permLevel: 0,
     };
     exports.help = {
         name: "avatar",
         description: ""
     }