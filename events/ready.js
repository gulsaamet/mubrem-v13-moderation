const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
module.exports = client => {
console.log ('_________________________________________');
  console.log (`Kullanıcı İsmi     : ${client.user.username} Olarak giriş yapıldı.`);
  console.log (`Komut Sayısı       : ${client.commands.size} Komut Var`);
  console.log (`Prefix             : ${prefix} (nokta)`);
  console.log (`Durum              : ${client.user.presence.status}!`);
  console.log (`Aktiflik Durumu    : Aktif!`);
  console.log ('_________________________________________'); 
};
