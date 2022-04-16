const discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.channel.send({ content: "Ping Ölçülüyor..." }).then((msg) => {
        var ping = msg.createdTimestamp - message.createdTimestamp;
        msg.edit(`
        **Selam dostum, aktifim ve ping bilgilerim de aşağıdaki gibi.**
        > **Bot:** \`${ping} ms\`
        > **Discord:** \`${message.client.ws.ping} ms\`
        `);
    });
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
  }
  exports.help = {
      name: "ping"
  }