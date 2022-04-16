const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');

exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(ayarlar.guildid)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setFooter({ text: `mubrem was here`, iconURL: message.author.avatarURL({ dynamic: true }) }).setTimestamp()
    if (!ayarlar.owner.includes(message.author.id)) return message.channel.send('Bu komuta erişiminiz yok.')
    if (!args[0]) return message.channel.send(`not content.`);
    let code = args.join(' ');
    function clean(text) {
        if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
        text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
        text = text.replaceAll(client.token, "yarramin basini alirsin askim kb.");
        return text;
    };
    try {
        var evaled = clean(await eval(code));
        if (evaled.match(new RegExp(`${client.token}`, 'g')));
        message.channel.send({ embeds: [embed.setDescription(`\`\`\`js\n${evaled}\`\`\``)] });
    } catch (err) { message.channel.send({ embeds: [embed.setDescription(`\`\`\`js\n${err}\`\`\``)] }); };

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["eval"]
  }
  exports.help = {
      name: "eval"
  }