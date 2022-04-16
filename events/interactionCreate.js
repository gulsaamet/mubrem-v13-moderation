module.exports = (client, interaction) => {if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return void interaction.reply({content: `Komutlarımın arasında \`${interaction.commandName}\` adında komut yok!`, ephemeral: true});
    command.run(client, interaction)};