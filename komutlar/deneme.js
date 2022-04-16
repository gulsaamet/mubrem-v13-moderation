const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('ban')
					.setLabel('Ban')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('jail')
					.setLabel('Jail')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('cmute')
					.setLabel('C.Mute')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('vmute')
					.setLabel('V.Mute')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('iptal')
					.setLabel('İptal')
					.setStyle('DANGER'),
			);

            let msg = await message.reply({ content: `${ayarlar.selam} Merhaba. ceza menüsüne hoş geldin, uygulamak istediğin cezayı seç.`, components: [row] });

            var filter = (button) => button.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
              
                  collector.on("collect", async (button) => {
          
                      if(button.customId === "ban") {
                          await button.reply({ content: `
                          `
               , ephemeral: false})
                          }
                     
                          if(button.customId === "jail") {
                              await button.reply({ content: ``
          , ephemeral: true})
                              }
          
                              if(button.customId === "cmute") {
                                  await button.reply({ content: `
                                  süre belirle lutfn`
          
                       , ephemeral: false})
                                  }

                                  if(button.customId === "vmute") {
                                    await button.reply({ content: ``
            
                         , ephemeral: true})
                                    }

                                    if(button.customId === "iptal") {
                                        await button.reply({ content: ``
                
                             , ephemeral: true})
                                        }
          
                     })
          

        }
        exports.conf = {
            enabled: true,
            guildOnly: false,
            aliases: ["ceza"]
          }
          exports.help = {
              name: "ceza"
          }