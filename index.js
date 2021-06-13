const Discord = require('discord.js');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();
const client = new Discord.Client();
const prefix = process.env.PREFIX || '!';


client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	let args = message.content.slice(prefix.length).trim().split(/\(([^)]+)\)/);
	const command = args.shift().trim();
    args = args[0].split(",");
    if (args.length != 2) {
        message.channel.send(`Comando inválido`);
        return;
    }
    const param = args[0].trim();
    const region = args[1].trim();

	if (command === 'info') {
        routes.getSummonerName(param, region).then(response => {
            if (response.status == 200) {
                message.channel.send(`El id del invocador ${response.data.name} es ${response.data.id} y se encuentra en el nivel ${response.data.summonerLevel}`);
            } else {
                message.channel.send('Error en la consulta');
            }
        }).catch(e => {
            console.log(e);
        });
    }
    if (command === 'infoLiga') {
        routes.getSummonerLeague(param, region).then(response => {
            let data = response.data[0];
            if (response.status == 200) {
                message.channel.send(`Liga de invocador ${data.summonerName} es ${data.tier} ${data.rank} con ${data.leaguePoints} puntos de liga`, {
                    files: [
                        `./files/ranked-emblems/Emblem_${data.tier.charAt(0).toUpperCase() + data.tier.slice(1)}.png`
                    ]
                });
            } else {
                message.channel.send('Error en la consulta');
            }
        }).catch(e => {
            console.log(e);
        });
    }
});
client.login(process.env.BOT_TOKEN);