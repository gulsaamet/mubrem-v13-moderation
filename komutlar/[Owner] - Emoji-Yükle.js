const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has("MANAGE_EMOJIS")) return message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription("Komutu kullanabilmek için geçerli yetkin olmalı.")]})
    let link = args[0]
    let isim = args[1];
    let guild = client.guilds.cache.get(ayarlar.guildid);
    if (!link) return message.channel.send({embeds: [new MessageEmbed() .setDescription("Yükleyeceğin emojiyi link olarak belirtmelisin.")]})
    if (!isim) return message.channel.send({embeds: [new MessageEmbed() .setDescription("Yükleyeceğin emojiye isim girmelisin.")]})

    guild.emojis.create(`${link}`, `${isim}`)
        .then(emoji => 
            message.channel.send({embeds: [new MessageEmbed() .setDescription(`${ayarlar.yes} \`${isim}\` adlı emojiyi sunucuya ekledim.`)]}))
         message.react(ayarlar.yes)
        .catch(console.error);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["emojiyükle","ey"]
  }
  exports.help = {
      name: "Emoji Yükle"
  }