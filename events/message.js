const fs = require("fs");
const ayarlar = require("../ayarlar.json");
const db =  require('quick.db');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
 module.exports = async message => {
var prefix = ayarlar.prefix
       let client = message.client;
  if (message.author.bot) message.channel.sendreturn;
   if (!message.content.startsWith(prefix)) return;
   let command = message.content.split(" ")[0].slice(prefix.length);

   let params = message.content.split(" ").slice(1);
   let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
   let cmd;
   if (client.commands.has(command)) {
     cmd = client.commands.get(command);
 } else if (client.aliases.has(command)) {
     cmd = client.commands.get(client.aliases.get(command));
   }
 if (cmd) {
     cmd.run(client, message, params);
 }
};
