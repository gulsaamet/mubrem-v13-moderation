//modüller baş
const fs = require("fs");
const Discord = require("discord.js");  //
const discord = require("discord.js");
const mongoose = require("mongoose");
const { Intents } = require("discord.js");
const client = new discord.Client({ intents: [32767] });
require("./util/eventLoader.js")(client);
const ayarlar = require("./ayarlar.json");
const db = require('quick.db')
const inviteSettings = new db.table("invite")


client.once("ready", () => {
	console.log(`[!] Başarıyla aktif oldum | @${client.user.tag}!`);
});


const log = message => {
	console.log(` ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
	if (err) console.error(err); //
	log(`${files.length} komut yüklenecek.`);
	files.forEach(f => {
		let props = require(`./komutlar/${f}`);
		log(`Yüklenen komut: ${props.help.name}. ✔`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});
       //                              
client.reload = command => {  //
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./komutlar/${command}`)];
			let commands = require(`./komutlar/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((commands, alias) => {
				if (commands === command) client.aliases.delete(alias);
			});
			client.commands.set(command, commands);
			commands.conf.aliases.forEach(alias => {
				client.aliases.set(alias, commands.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.load = command => {
	return new Promise((resolve, reject) => {
		try { //
			let commands = require(`./komutlar/${command}`);
			client.commands.set(command, commands);
			commands.conf.aliases.forEach(alias => {
				client.aliases.set(alias, commands.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.unload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./komutlar/${command}`)];
			let commands = require(`./komutlar/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((commands, alias) => {
				if (commands === command) client.aliases.delete(alias);
			});
			resolve(); //
		} catch (e) {
			reject(e);
		}
	});
};

client.on("ready", () => {
	client.user.setActivity(ayarlar.botActivity);
	console.log("[+] Botun durumu ayarlandı.");
}); 

const { joinVoiceChannel } = require('@discordjs/voice');
client.on('ready', () => {
    joinVoiceChannel({
        channelId: ayarlar.voiceChannel,
        guildId: ayarlar.guildid,
        adapterCreator: client.guilds.cache.get(ayarlar.guildid).voiceAdapterCreator
    });
});

//Afk şeyşi

client.on("messageCreate", async message => {
    const csms = require("pretty-ms")
    const db = require("quick.db");
    const dc = require("discord.js");
    if (await db.get(`afk_${message.author.id}`)) {
      let süre = await db.get(`afk_süre_${message.author.id}`);
      let zaman = csms(Date.now() - süre);
      db.delete(`afk_${message.author.id}`);
      db.delete(`afk_süre_${message.author.id}`);
    
      message.member.setNickname(db.get(`afktag_${message.author.id}`)).catch(e => {})
    
      const afk_cikis = new dc.MessageEmbed()
      .setColor("ff0000")
      .setDescription(
        `**<@${message.author.id}>,  \`${zaman}\` Boyunca AFK Modundaydın!**`
      );
      message.channel.send({embeds:[afk_cikis]}).catch(e => {})
    }
    
    var kullanıcı = message.mentions.users.first();
    if (!kullanıcı) return;
    var sebep = await db.get(`afk_${kullanıcı.id}`);
    
    if (sebep) {
      let süre = await db.get(`afk_süre_${kullanıcı.id}`);
      let zaman = csms(Date.now() - süre);
    
      const afk_uyarı = new dc.MessageEmbed()
      .setColor("ff0000")
      .setDescription(
        `**<@${kullanıcı.id}> Adlı Kullanıcı \`${sebep}\` Sebebiyle; \`${zaman}\` Süredir AFK!**`
      );
      message.reply({embeds: [afk_uyarı]}).catch(e => {})
    }
    });

	  ///////////////////////////////////// ETIKET ENGEL ////////////////////////////////////////

mongoose.connect(ayarlar.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

	  ///////////////////////////////////// ETIKET ENGEL ////////////////////////////////////////

	  const mentionRegex = /<@!?&?\d+>/g;

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.permissions.has("ADMINISTRATOR")) return;

 if (mentionRegex.test(message.content) && message.content.match(mentionRegex).length >= 4) {
        message.member.roles.add(ayarlar.muteRol);
        message.channel.send(`${ayarlar.chatmute} Birden çok kişiyi etiketlediğin için \`15 dakika\` boyunca susturuldun. ${message.author}`);
        setTimeout(() => {
            message.member.roles.remove(ayarlar.muteRol);
       message.channel.send(`${ayarlar.chatunmute} Birden çok kişiyi etiketleme sebebiyle olan, Muten açıldı lütfen tekrar insanları etiketleme. ${message.author}`)
        }, 900000);//9000000
        if (message.deletable) message.delete({ timeout: 5000 }).catch(console.error);
    }
});

///////////////////////////////////// OYUN ROL ALMA ////////////////////////////////////////
 
client.on('messageCreate', async message => {
	const { Client, Intents,Collection, interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');
	
	if (message.content == `.oyun-menü`) {
		if(message.author.id !== "937421302954864693") return;
		const menu = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('menu1')
					.setPlaceholder('Oyunlarınızı seçebilirsiniz.')
					.addOptions([
						{
							label: 'Minecraft',
							description: 'Minecraft rolünü almak için tıklayın.',
							value: 'mc',
						},
						{
							label: 'Mobile Legends',
							description: 'Mobile Legends rolünü almak için tıklayınız.',
							value: 'mlbb',
						},
						{
							label: 'LoL',
							description: 'League of Legends rolünü almak için tıklayınız.',
							value: 'lol',
						},
						{
							label: 'GTA5',
							description: 'GTA 5 rolünü almak için tıklayınız.',
							value: 'gta5',
						},
						{
							label: 'Valorant',
							description: 'Valorant rolünü almak için tıklayınız.',
							value: 'valo',
						},
					]),
			);

		const m = await message.channel.send({  content: `${ayarlar.selam} Selamlar **${message.guild.name} dostları.** Aşağıdaki menüden oyun rollerinizi alabilirsiniz.`,components: [menu] });
					
		const collector = m.createMessageComponentCollector({ filter: w=>w.user.id===message.author.id })
	};
});

client.on("interactionCreate", async(interaction) => {
	if(interaction.values && interaction.values[0] == 'mc'){
			if(!interaction.member.roles.cache.has(ayarlar.minecraft)) {
				await interaction.member.roles.add(ayarlar.minecraft).catch(err => {})
				await interaction.reply({content: 'Başarıyla \`Minecraft\` rolünü aldın.', ephemeral: true})
			} else {
				await interaction.member.roles.remove(ayarlar.minecraft).catch(err => {})
			    await interaction.reply({content: 'Başarıyla \`Minecraft\` rolünü üzerinden kaldırdın.', ephemeral: true})
			}
	}

	if(interaction.values && interaction.values[0] == 'mlbb'){
		if(!interaction.member.roles.cache.has(ayarlar.mlbb)) {
			await interaction.member.roles.add(ayarlar.mlbb).catch(err => {})
			await interaction.reply({content: 'Başarıyla \`Mobile Legends\` rolünü aldın.', ephemeral: true})
		} else {
			await interaction.member.roles.remove(ayarlar.mlbb).catch(err => {})
			await interaction.reply({content: 'Başarıyla \`Mobile Legends\` rolünü üzerinden kaldırdın.', ephemeral: true})
			
		}
}

if(interaction.values && interaction.values[0] == 'lol'){
	if(!interaction.member.roles.cache.has(ayarlar.lol)) {
		await interaction.member.roles.add(ayarlar.lol).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`League of Legends\` rolünü aldın.', ephemeral: true})
	} else {
		await interaction.member.roles.remove(ayarlar.lol).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`League of Legends\` rolünü üzerinden kaldırdın.', ephemeral: true})
	}
}

if(interaction.values && interaction.values[0] == 'gta5'){
	if(!interaction.member.roles.cache.has(ayarlar.gta5)) {
		await interaction.member.roles.add(ayarlar.gta5).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`GTA 5\` rolünü aldın.', ephemeral: true})
	} else {
		await interaction.member.roles.remove(ayarlar.gta5).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`GTA 5\` rolünü üzerinden kaldırdın.', ephemeral: true})
	}
}

if(interaction.values && interaction.values[0] == 'valo'){
	if(!interaction.member.roles.cache.has(ayarlar.valorant)) {
		await interaction.member.roles.add(ayarlar.valorant).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`Valorant\` rolünü aldın.', ephemeral: true})
	} else {
		await interaction.member.roles.remove(ayarlar.valorant).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`Valorant\` rolünü üzerinden kaldırdın.', ephemeral: true})
	}
}
	
})  

  ///////////////////////////////////// ILISKI ROL ALMA ////////////////////////////////////////

  client.on('messageCreate', async message => {
	const { Client, Intents,Collection, interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');
	
	if (message.content == `.iliski-menü`) {
		if(message.author.id !== "937421302954864693") return;
		const menu = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('menu1')
					.setPlaceholder('İlişki rollerinizi alabilirsiniz.')
					.addOptions([
						{
							label: 'Lovers',
							description: 'Lovers rolünü almak için tıklayın.',
							value: 'mubremlovers',
						},
						{
							label: 'LGBT',
							description: 'LGBT rolünü almak için tıklayınız.',
							value: 'mubremlgbt',
						},
						{
							label: 'Alone',
							description: 'Alone rolünü almak için tıklayınız.',
							value: 'mubremalone',
						},
					]),
			);

		const m = await message.channel.send({  content: `${ayarlar.selam} Selamlar **${message.guild.name} dostları.** Aşağıdaki menüden ilişki rolünüzü alabilirsiniz.`,components: [menu] });
					
		const collector = m.createMessageComponentCollector({ filter: w=>w.user.id===message.author.id })
	};
});

client.on("interactionCreate", async(interaction) => {
	if(interaction.values && interaction.values[0] == 'mubremlovers'){
			if(!interaction.member.roles.cache.has(ayarlar.couple)) {
				await interaction.member.roles.add(ayarlar.couple).catch(err => {})
				await interaction.reply({content: 'Başarıyla \`Lovers\` rolünü aldın.', ephemeral: true})
			} else {
				await interaction.member.roles.remove(ayarlar.couple).catch(err => {})
			    await interaction.reply({content: 'Başarıyla \`Lovers\` rolünü üzerinden kaldırdın.', ephemeral: true})
			}
	}

	if(interaction.values && interaction.values[0] == 'mubremlgbt'){
		if(!interaction.member.roles.cache.has(ayarlar.lgbt)) {
			await interaction.member.roles.add(ayarlar.lgbt).catch(err => {})
			await interaction.reply({content: 'Başarıyla \`LGBT\` rolünü aldın.', ephemeral: true})
		} else {
			await interaction.member.roles.remove(ayarlar.lgbt).catch(err => {})
			await interaction.reply({content: 'Başarıyla \`LGBT\` rolünü üzerinden kaldırdın.', ephemeral: true})
			
		}
}

if(interaction.values && interaction.values[0] == 'mubremalone'){
	if(!interaction.member.roles.cache.has(ayarlar.alone)) {
		await interaction.member.roles.add(ayarlar.alone).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`Alone\` rolünü aldın.', ephemeral: true})
	} else {
		await interaction.member.roles.remove(ayarlar.alone).catch(err => {})
		await interaction.reply({content: 'Başarıyla \`Alone\` rolünü üzerinden kaldırdın.', ephemeral: true})
	}
}
	
})  

///////////////////////////////////// ET-CEK ROL ALMA ////////////////////////////////////////

client.on('messageCreate', async message => {
	const { Client, Intents,Collection, interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');
	
	if (message.content == `.rolalma`) {
		if(message.author.id !== "937421302954864693") return;
		const menu = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('menu1')
					.setPlaceholder('Rollerinizi alabilirsiniz.')
					.addOptions([
						{
							label: 'Çekiliş Katılımcısı',
							description: 'Çekiliş katılımcısı rolünü almak için tıklayın.',
							value: 'mubremcek',
						},
						{
							label: 'Etkinlik Katılımcısı',
							description: 'Etkinlik Katılımcısı rolünü almak için tıklayınız.',
							value: 'mubremet',
						},
					]),
			);

		const m = await message.channel.send({  content: `🎀 Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız **Çekilişler, Etkinlikler V/K ve D/C'den** haberdar olacaksınız. 

		\`•\` Eğer \`@🎉 Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
		
		\`•\` Eğer \`@🎁 Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz **Netflix, BluTV, Exxen, Spotify, Discord Nitro** ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 
		
		**NOT**: \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuzda @everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,components: [menu] });
					
		const collector = m.createMessageComponentCollector({ filter: w=>w.user.id===message.author.id })
	};
});

client.on("interactionCreate", async(interaction) => {
	if(interaction.values && interaction.values[0] == 'mubremcek'){
			if(!interaction.member.roles.cache.has(ayarlar.cekilis)) {
				await interaction.member.roles.add(ayarlar.cekilis).catch(err => {})
				await interaction.reply({content: 'Başarıyla \`Çekiliş Katılımcısı\` rolünü aldın.', ephemeral: true})
			} else {
				await interaction.member.roles.remove(ayarlar.cekilis).catch(err => {})
			    await interaction.reply({content: 'Başarıyla \`Çekiliş Katılımcısı\` rolünü üzerinden kaldırdın.', ephemeral: true})
			}
	}

	if(interaction.values && interaction.values[0] == 'mubremet'){
		if(!interaction.member.roles.cache.has(ayarlar.etkinlik)) {
			await interaction.member.roles.add(ayarlar.etkinlik).catch(err => {})
			await interaction.reply({content: 'Başarıyla \`Etkinlik Katılımcısı\` rolünü aldın.', ephemeral: true})
		} else {
			await interaction.member.roles.remove(ayarlar.etkinlik).catch(err => {})
			await interaction.reply({content: 'Başarıyla \`Etkinlik Katılımcısı\` rolünü üzerinden kaldırdın.', ephemeral: true})
		}
}
	
})  

  ///////////////////////////////////// KULLANICI PANEL ////////////////////////////////////////
  
  client.on('messageCreate', async message => {
    const { Client, Intents,Collection, interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');
    const moment = require('moment')
	if (message.content == `.kpanel`) {
		if(message.author.id !== "937421302954864693") return;
        const menu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('menu1')
                    .setPlaceholder('Kullanıcı Paneline Hoş Geldiniz.')
                    .addOptions([
                        {
                            label: 'Sunucuya Katılma Tarihiniz.',
                            description: 'Sunucuya katılma tarihinizi öğrenmek için tıklayın.',
                            value: 'mubrem1',
                        },
                        {
                            label: 'Hesabınızın Açılma Tarihi.',
                            description: 'Hesabınızın açılma tarihini öğrenmek için tıklayın.',
                            value: 'mubrem2',
                        },
                        {
                            label: 'Tekrar Kayıt Olma.',
                            description: 'Sunucuya tekrar kayıt olmak için tıklayın.',
                            value: 'mubrem3',
                        },
                        {
                            label: 'Üzerinizde Bulunan Roller.',
                            description: 'Üzerinizde bulunan rolleri görmek için tıklayın.',
                            value: 'mubrem4',
                        },
                        {
                            label: 'Sunucu Bilgileri.',
                            description: 'Sunucu bilgilerine erişmek için tıklayın.',
                            value: 'mubrem5',
                        },
                    ]),
            );

        const m = await message.channel.send({  content: `${ayarlar.selam} \`${message.guild.name}\` Sunucusu içerisi ulaşmak istediğiniz bilgilere menüden tıklamanız yeterli olucaktır. ${ayarlar.simsek}`,components: [menu] });
                    
        const collector = m.createMessageComponentCollector({ filter: w=>w.user.id===message.author.id })
    };
});

  client.on("interactionCreate", async(interaction) => {
	const moment = require('moment');
	let kullanıcı = interaction.guild.members.cache.get(interaction.user.id)
	
      if(interaction.values && interaction.values[0] == 'mubrem1'){
                await interaction.reply({content: `Sunucuya Katılma Tarihiniz :  \`${moment(member.joinedTimestamp).format('LLL')}\``, ephemeral: true})
    }

    if(interaction.values && interaction.values[0] == 'mubrem2'){
		
	await interaction.reply({content: `Hesabınızın kuruluş tarihi : <t:${Math.floor(kullanıcı.user.createdTimestamp / 1000)}:D>**(<t:${Math.floor(kullanıcı.user.createdTimestamp / 1000)}:R>)**`, ephemeral: true})}

if(interaction.values && interaction.values[0] == 'mubrem3'){
        let member = await client.guilds.cache.get(ayarlar.guildid).members.fetch(interaction.member.user.id)
if(!member) return;
        member.roles.set([ayarlar.unregister]).catch(e=>{})
        await interaction.reply({content: `Başarıyla kayıtsıza atıldınız.`, ephemeral: true})
}

if(interaction.values && interaction.values[0] == 'mubrem4'){
        await interaction.reply({content: `Üzerinde Bulunan Rollerin Listesi ;
        
        ${(interaction.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? interaction.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`, ephemeral: true})
}

if(interaction.values && interaction.values[0] == 'mubrem5'){
        await interaction.reply({content: `${ayarlar.simsek} Sesli kanallardaki üye sayısı : \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\`
        ${ayarlar.simsek} Sunucudaki toplam üye sayısı : \`${(interaction.guild.memberCount)}\`
        ${ayarlar.simsek} Sunucunun oluşturulma tarihi: \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
        ${ayarlar.simsek} Sunucu destek numarası : \`${(interaction.guild.id)}\`
        `, ephemeral: true})
}
    
}) 

///////////////////////////////////// SEVIYE SYSTEM ////////////////////////////////////////

client.on("messageCreate", async msg => {
	const request = require("node-superfetch");
	const db = require("quick.db");
	  if (db.has(`lvll_${msg.guild.id}`) === true) {
		let memberChannel = await db.fetch(`sk_${msg.guild.id}`);
		
		let level =  await db.fetch(`seviye_${msg.author.id + msg.guild.id}`)
	
		if (msg.channel.type === "dm") return;
		if (msg.author.bot) return;
  
		if (msg.content.length > 40) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 4);
		}
		if (msg.content.length > 35) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 4);
		}
		if (msg.content.length > 30) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 3);
		}
		if (msg.content.length > 25) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 3);
		}
		if (msg.content.length > 20) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 2);
		}
		if (msg.content.length > 15) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 2);
		}
		if (msg.content.length > 10) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
		}
		if (msg.content.length < 5) {
		  db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
		}
		if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 250) {
		  db.add(`seviye_${msg.author.id + msg.guild.id}`, 1);
		  if (memberChannel) {
			if (db.has(`üyelikk_${msg.author.id}`)) {
			  msg.guild.channels
				.cache.get(memberChannel)
				.send(
				  `${ayarlar.simsek} Kral <@${
					msg.author.id
				  }>, Seviye atladın ve \`${db.fetch(
					`seviye_${msg.author.id + msg.guild.id}`
				  )}\` seviye oldun!`
				);
			} else
			  msg.guild.channels
				.cache.get(memberChannel)
				.send(
				  `Tebrik ederim <@${
					msg.author.id
				  }>! Seviye atladın ve \`${db.fetch(
					`seviye_${msg.author.id + msg.guild.id}`
				  )}\` seviye oldun!`
				);
		  } else if (db.has(`üyelikk_${msg.author.id}`)) {
			msg.channel.send(
			  `${ayarlar.simsek} Kral <@${
				msg.author.id
			  }>, Seviye atladın ve \`${db.fetch(
				`seviye_${msg.author.id + msg.guild.id}`
			  )}\` seviye oldun!`
			);
		  } else
			msg.channel.send(
			  `Tebrik ederim <@${msg.author.id}>! Seviye atladın ve \`${db.fetch(
				`seviye_${msg.author.id + msg.guild.id}`
			  )}\` seviye oldun!`
			);
  
		  db.delete(`puancik_${msg.author.id + msg.guild.id}`);
		}
	  } else return;
  });
  
///////////////////////////////////// kufur engel ////////////////////////////////////////

client.on("messageCreate", async msg => {
	if (msg.author.bot) return;
	let i = await db.fetch(`${msg.guild.id}.kufur`)
	if (i == 'acik') {
	const kufur = ["amk", "ananı sikiyim", "ananıskm", "piç", "amk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "yarrak", "amcık", "yarram", "sikimi ye", "amq"];
				if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
				  try {
					if (!msg.member.permissions.has("BAN_MEMBERS")) {
					  msg.delete();
					  return msg.channel.send({embeds:[
						new Discord.MessageEmbed()
			   .setColor('BLUE')
			   .setDescription(`<@${msg.author.id}> __**küfür etmek yasak!**__ ${ayarlar.no}`)]}).then((message) => setTimeout(() => message.delete(), 6000));
					}
				  } catch(err) {

				  }
				}
  } if (!i) return; 
})
			client.on("messageUpdate", async (oldMessage, newMessage) => {
			  if (oldMessage.author.bot) return;
			  let i = await db.fetch(`${oldMessage.guild.id}.kufur`)
			  if (i == 'acik') {
			  const kufur = ["amk", "ananı sikiyim", "ananıskm", "piç", "amk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "yarrak", "amcık", "yarram", "sikimi ye", "amq"];
					 if (kufur.some(word => newMessage.content.includes(word))) {
					   try {
						 if (!oldMessage.member.permissions.has("BAN_MEMBERS")) {
							   oldMessage.delete();

								   return oldMessage.channel.send({embeds:[
									new Discord.MessageEmbed()
									.setColor('BLUE')
									.setDescription(`<@${oldMessage.author.id}> __**küfür etmek yasak!**__ ${ayarlar.no}`)]}).then((message) => setTimeout(() => message.delete(), 6000));
								   }
					   } catch(err) {

					   }
					 }
		   
		   } if(!i) return; 
		  }); 
 ///////////////////////////////////// reklam engel ////////////////////////////////////////

 client.on("messageCreate", async msg => {
	if (msg.author.bot) return;  
 {
				const reklam = ["https://","http://","discord.gg",".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".net", ".rf.gd", ".az", ".party", "discord.gg"];
				if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
				  try {
					if (!msg.member.permissions.has("MANAGE_GUILD")) {
					  msg.delete();
					  return msg.channel.send({embeds:[
						 new Discord.MessageEmbed()
						 .setColor('BLUE')
						 .setDescription(`<@${msg.author.id}> __**link atmak yasak!**__ ${ayarlar.no}`)]}).then((message) => setTimeout(() => message.delete(), 6000));
					}
				  } catch(err) {
  
				  }
				}
  
  }
  
  })
			client.on("messageUpdate", async (oldMessage, newMessage) => {
			  if (oldMessage.author.bot) return;
 {      
			  const reklam = ["https://","http://","discord.gg",".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".net", ".rf.gd", ".az", ".party", "discord.gg"];
					 if (reklam.some(word => newMessage.content.includes(word))) {
					   try {
						 if (!oldMessage.member.permissions.has("MANAGE_GUILD")) {
							   oldMessage.delete();
  
								   return oldMessage.channel.send({embeds:[
									new Discord.MessageEmbed()
						 .setColor('BLUE')
						 .setDescription(`<@${oldMessage.author.id}> __**link atmak yasak!**__ ${ayarlar.no}`)]}).then((message) => setTimeout(() => message.delete(), 6000));
								   }
					   } catch(err) {
  
					   }
					 }
			 }  
			});

 ///////////////////////////////////// message log ////////////////////////////////////////

			client.on("messageDelete", async message => {
				if (message.author.bot) return; 
				let mesajlog = ayarlar.messageLog
				if(!mesajlog) return;
				const embed2 = new Discord.MessageEmbed()
				.setTitle('Bir mesaj silindi!')
				.setDescription(`${ayarlar.simsek} __**Silen kişi**__: <@${message.author.id}> \n${ayarlar.simsek} __**Silinen Kanal**__: <#${message.channel.id}> \n${ayarlar.simsek} __**Silinen mesaj**__: ${message.content}`)
				.setColor('RANDOM')
			   client.channels.cache.get(mesajlog).send({embeds:[embed2]})
			  })
			
			  //
			  client.on("messageUpdate", async (oldMessage, newMessage) => {
				if (oldMessage.author.bot) return; 
				let mesajlog = ayarlar.messageLog
				if(!mesajlog) return;
				if(oldMessage.author.bot) return;
				const embed = new Discord.MessageEmbed()
				.setTitle('Bir mesaj düzenlendi!')
				.setDescription(`${ayarlar.simsek} __**Düzenleyen kişi**__: <@${oldMessage.author.id}> \n${ayarlar.simsek} __**Düzenlenen Kanal**__: <#${oldMessage.channel.id}> \n${ayarlar.simsek} __**Düzenlenen mesaj**__: ${oldMessage.content} \n${ayarlar.simsek} __**Yeni Mesaj**__: ${newMessage.content}`)
				.setColor('RANDOM')
				client.channels.cache.get(mesajlog).send({embeds:[embed]})
			  });
 ///////////////////////////////////// invite bebek ////////////////////////////////////////

 const Invites = new Discord.Collection();
client.on("ready", () => { client.guilds.cache.forEach(guild => { guild.invites.fetch().then(_invites => { Invites.set(guild.id, _invites);}).catch(err => {});});});
client.on("inviteCreate", (invite) => { var gi = Invites.get(invite.guild.id);
  inviteSettings.set(invite.code, invite);
  Invites.set(invite.guild.id, gi);});
client.on("inviteDelete", (invite) => { var gi = Invites.get(invite.guild.id);
  gi.delete(invite.code);
  Invites.set(invite.guild.id, gi);});

client.on("guildCreate", (guild) => { guild.fetchInvites().then(invites => { Invites.set(guild.id, invites);}).catch(e => {})})

client.on("guildMemberAdd", async (member) => {

  const gi = (Invites.get(member.guild.id) || new Collection()).clone()
  let guild = member.guild
  let total = 0
  let regular = 0 
  let _fake = 0
  let bonus = 0;
  let fake = (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3 ? true : false

  guild.invites.fetch().then(async invites => {
    let invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
    Invites.set(member.guild.id, invites);
    if (invite == guild.vanityURLCode) return client.channels.cache.find(a => a.name == "invite-log").send(`:white_check_mark: \`${member.user.tag}\` kullanıcısı özel bir davet linki ile giriş yaptı!`);
    if (invite.inviter) {
      if (fake) { /* total = await inviteSettings.add(`invites.${invite.inviter.id}.total`, 1);
    _fake = await inviteSettings.add(`invites.${invite.inviter.id}.fake`, 1); */ } else { total = await inviteSettings.add(`invites.${invite.inviter.id}.total`, 1);
  /* regular = await inviteSettings.add(`invites.${invite.inviter.id}.regular`, 1); */ }
      bonus = await inviteSettings.get(`invites.${invite.inviter.id}.bonus`) || 0;}
   /* await inviteSettings.set(`invites.${member.id}.isfake`, fake); */

    client.channels.cache.find(a => a.name == "invite-log").send(`:white_check_mark: \`${member.user.tag}\` kullanıcısı sunucuya ${invite.inviter || "-**veritabanında kullanıcıyı bulamadım**-"} kullanıcısı tarafından davet edildi!`)
      /* .replace("-target-", `${invite.inviter}`)
      .replace("-total-", `${total}`)
      .replace("-bonus-", `${bonus}`)
      .replace("-regular-", `${regular}`)
      .replace("-fakecount-", `${_fake}`)
      .replace("-invite-", `${invite && invite.code != undefined ? invite.code : "özel bir davet linki"}`)
      .replace("-fake-", `${fake}`)}).catch();}); */
  })})

client.on("guildMemberRemove", async (member) => {
  var total = 0,
    bonus = 0,
    regular = 0,
    fakecount = 0,
    data = inviteSettings.get(`invites.${member.id}`);
  if (!data) return;

  if (data.isfake && data.inviter) { fakecount = inviteSettings.subtract(`invites.${data.inviter}.fake`, 1);
    total = inviteSettings.subtract(`invites.${data.inviter}.total`, 1);} else if (data.inviter) { regular = inviteSettings.subtract(`invites.${data.inviter}.regular`, 1);
    total = inviteSettings.subtract(`invites.${data.inviter}.total`, 1);}
  if (data.inviter) bonus = inviteSettings.get(`invites.${data.inviter}.bonus`) || 0;

  inviteSettings.add(`invites.${data.inviter}.leave`, 1);
  client.channels.cache.find(a => a.name == "invite-log").send(`:x: ${member} kullanıcısı sunucudan çıkış yaptı! Bu kullanıcıyı <@${data.inviter || "özel bir URL"}> tarafından davet edilerek giriş yapmıştı.`)})

////////////////////////////// VOİCE LOG ///////////////////////////////

  client.on('voiceStateUpdate', async (oldState, newState) => {
	let voiceLog = ayarlar.voiceLog
	if (!oldState.channelID && newState.channelID) return voiceLog.send(`${newState.guild.members.cache.get(newState.id)} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).id}\`) kullanıcısı ${newState.guild.channels.cache.get(newState.channelID)} (\`${newState.guild.channels.cache.get(newState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).id}\`) ses kanalına **giriş yaptı!**`);
	if (oldState.channelID && !newState.channelID) return voiceLog.send(`${newState.guild.members.cache.get(newState.id)} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).id}\`) kullanıcısı ${newState.guild.channels.cache.get(oldState.channelID)} (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` - \`${newState.guild.channels.cache.get(oldState.channelID).id}\`) ses kanalından **çıkış yaptı!**`);
	if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return voiceLog.send(`${newState.guild.members.cache.get(newState.id)} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).id}\`) kullanıcısı ${newState.guild.channels.cache.get(oldState.channelID)} (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` - \`${newState.guild.channels.cache.get(oldState.channelID).id}\`) kanalından ${newState.guild.channels.cache.get(newState.channelID)} (\`${newState.guild.channels.cache.get(newState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).id}\`) kanalına **geçiş yaptı!**`);
	if (oldState.channelID && oldState.selfMute && !newState.selfMute) return voiceLog.send(`${newState.guild.members.cache.get(newState.id)} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).id}\`) kullanıcısı ${newState.guild.channels.cache.get(newState.channelID)} (\`${newState.guild.channels.cache.get(newState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).id}\`) ses kanalında **kendi susturmasını kaldırdı!**`);
	if (oldState.channelID && !oldState.selfMute && newState.selfMute) return voiceLog.send(`${newState.guild.members.cache.get(newState.id)} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).id}\`) kullanıcısı ${newState.guild.channels.cache.get(newState.channelID)} (\`${newState.guild.channels.cache.get(newState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).id}\`) ses kanalında **kendisini susturdu!**`);
	if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return voiceLog.send(`${newState.guild.members.cache.get(newState.id)} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).id}\`) kullanıcısı ${newState.guild.channels.cache.get(newState.channelID)} (\`${newState.guild.channels.cache.get(newState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).id}\`) ses kanalında **kendi sağırlaştırmasını kaldırdı!**`);
	if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return voiceLog.send(`${newState.guild.members.cache.get(newState.id)} (\`${newState.guild.members.cache.get(newState.id).user.tag}\` - \`${newState.guild.members.cache.get(newState.id).id}\`) kullanıcısı ${newState.guild.channels.cache.get(newState.channelID)} (\`${newState.guild.channels.cache.get(newState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).id}\`) ses kanalında **kendisini sağırlaştırdı!**`)
  
  })

client.login(ayarlar.token);

process.on('warning', e => console.warn(e.stack));
