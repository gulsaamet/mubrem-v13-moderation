const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('x1genel')
					.setLabel('Genel')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('x2mod')
					.setLabel('Moderasyon')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('x3owner')
					.setLabel('Owner')
					.setStyle('PRIMARY'),
			);

            let msg = await message.reply({ content: `${ayarlar.selam} Merhaba, yardım menüsüne hoş geldin. Aşadağıda bulunan butonlardan istediğin menüyü seçebilirsin.`, components: [row] });

  var filter = (button) => button.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
    
        collector.on("collect", async (button) => {

            if(button.customId === "x1genel") {
                await button.reply({ content: `
     \`\`\`
[+] .avatar [@Mubrem/ID]
[+] .banner [@Mubrem/ID]
[+] .profil [@Mubrem/ID]
[+] .nerede [@Mubrem/ID]
[+] .seviye [@Mubrem/ID]
[+] .afk [Sebep]
[+] .booster [Nick]
[+] .hesaptara [gün]
[+] .snipe
[+] .link\`\`\`
Toplam Komut : ${client.commands.size}`
     , ephemeral: true})
                }
           
                if(button.customId === "x2mod") {
                    await button.reply({ content: `
         \`\`\`
[+] .ban [@Mubrem/ID] Sebep
[+] .jail [@Mubrem/ID] Sebep 
[+] .mute [@Mubrem/ID] Sebep
[+] .uyar [@Mubrem/ID] Sebep 
[+] .unban [@Mubrem/ID]
[+] .unjail [@Mubrem/ID]
[+] .unmute [@Mubrem/ID]
[+] .uyarılar [@Mubrem/ID]
[+] .vip [@Mubrem/ID]
[+] .ytver [@Mubrem/ID]
[+] .kanal [Aç/Kapat]
[+] .rolsüz [Ver]
[+] .sil [Miktar]
[+] .voice 
[+] .ysay\`\`\`
Toplam Komut : ${client.commands.size}`
, ephemeral: true})
                    }

                    if(button.customId === "x3owner") {
                        await button.reply({ content: `
             \`\`\`
[+] .ey [Link] - [isim]
[+] .eval [code]
[+] .katıldı ver/al [ID]
[+] .seviye-kanal [#kanal]
[+] .seviye-sistem [aç/kapat]
[+] .küfür-engel [aç/kapat] 
[+] .tagtara [tag]
[+] .rolalma 
[+] .iliski-menü
[+] .oyun-menü
[+] .kpanel
[+] .nuke
[+] .serverinfo
[+] .rolkontrol\`\`\`
Toplam Komut : ${client.commands.size}
`

             , ephemeral: true})
                        }

           })

           
        
           
           
                }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["help","h","y"]
  }
  exports.help = {
      name: "yardım"
  }