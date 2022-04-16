const discord = require("discord.js");

exports.run = async (client, message, args) => {
    let user = args.length > 0 ? message.mentions.users.first() || await this.client.users.fetch(args[0]) || message.author : message.author
    const can = await client.api.users(user.id).get();
    message.channel.send(`https://cdn.discordapp.com/banners/${can.id}/${can.banner}?size=512`)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["banner"]
  }
  exports.help = {
      name: "Banner"
  }