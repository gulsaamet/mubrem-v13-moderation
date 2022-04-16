const Discord = require("discord.js")
const db = require("quick.db");


exports.run = async (client, message, args) => {

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send(`Geçerli bir üye belirtmelisiniz.`)

let cihaz = ""
let ha = Object.keys(member.presence.clientStatus)
if (ha[0] == "mobile") cihaz = "Mobil Telefon"
if (ha[0] == "desktop") cihaz = "Masaüstü Uygulama"
if (ha[0] == "web") cihaz = "İnternet Tarayıcısı"


message.channel.send((`
${ayarlar.simsek} ${member} kullanıcısı \`${cihaz}\` cihazından bağlanıyor.
`))
};

exports.conf = {
    aliases:[]
};

exports.help = {
    name:'cihaz'
}