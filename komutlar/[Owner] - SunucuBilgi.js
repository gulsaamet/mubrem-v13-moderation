const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embeds: [new MessageEmbed() .setDescription("Komutu kullanabilmek için geçerli yetkin olmalı.")]})

  const verificationLevels = {
    NONE: "Çok Düşük",
    LOW: "Normal",
    MEDIUM: "Güçlü",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
  };

  const boostLevel = {
    TIER_1: "1. Seviye",
    TIER_2: "2. Seviye",
    TIER_3: "3. Seviye",
  }


  const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString());
  const members = message.guild.members.cache
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;

  const embed = new MessageEmbed()
    .setAuthor({name: `Sunucu Bilgisi - ${message.guild.name}`})
    .setColor("BLUE")
    .setFooter(`mubrem was here.`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField("Genel", 
      `**❯ İsim:** \`${message.guild.name}\`\n`+
      `**❯ ID:** \`${message.guild.id}\`\n`+
      `**❯ Kurucu:** \`${client.users.cache.get(message.guild.ownerId).username}\`\n`+
      `**❯ Konum:** \`${message.guild.preferredLocale}\`\n`+
      `**❯ Boost Level:** \`${boostLevel[message.guild.premiumTier] || "0. Seviye"}\`\n`+
      `**❯ Doğrulama Seviyesi:** \`${verificationLevels[message.guild.verificationLevel]}\`\n`+
      `**❯ Oluşturulma Tarihi:** <t:${Math.floor(message.guild.createdTimestamp / 1000)}:F>\n`+
      `**❯** [Sunucu Resmi](${message.guild.iconURL({ dynamic: true })})\n`+
      `**❯ Sunucu Özellikleri:** \`${message.guild.features.join(", ") || "Yok"}\``)

    .addField("İstatistik",
      `**❯ Rol Sayısı:** \`${roles.length}\`\n`+
      `**❯ Emoji Sayısı:** \`${emojis.size}\`\n`+
      `**❯ Normal Emoji:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n`+
      `**❯ Hareketli Emoji:** \`${emojis.filter(emoji => emoji.animated).size}\`\n`+
      `**❯ Yazı Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_TEXT").size}\`\n`+
      `**❯ Ses Kanalları:** \`${channels.filter(channel => channel.type === "GUILD_VOICE").size}\`\n`+
      `**❯ Boost Sayısı:** \`${message.guild.premiumSubscriptionCount || "0"}\``)

    .addField("Kullanıcı",
      `**❯ Toplam Üye:** \`${message.guild.memberCount}\`\n`+
      `**❯ İnsanlar:** \`${members.filter(member => !member.user.bot).size}\`\n`+
      `**❯ Botlar:** \`${members.filter(member => member.user.bot).size}\`\n`)
    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()})
    .setTimestamp();
  if (message.guild.description)
    embed.setDescription("**Server Açıklaması:** "+ message.guild.description);
  message.channel.send({embeds: [embed]})
  
};

module.exports.conf = {
    aliases: ["serverinfo"]
  };

module.exports.help = {
  name: "sunucu-bilgi"
};