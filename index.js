require('dotenv/config');
require('./server');

const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const ASCII = require('ascii-table');
const Enmap = require('enmap');

const table = new ASCII().setHeading('Command', 'Status');

const client = new Client();

client.commands = new Collection();
client.cmdInfo = new Collection();
client.checkPermission = (argument, permission_node = 'ADMINISTRATOR') => {
	return argument.permissions.has(permission_node);
};

client.bans = new Enmap({ name: 'bans' });
client.mutes = new Enmap({ name: 'mutes' });

client.on('ready', async () => {
	console.log(`Diep Dominion Maintenance#4675 is online.`)
	client.user.setActivity(`💥Long Live [DD]💥`, { type: 'PLAYING' });
	
	fs.readdir('./commands/', (er, files) => {
		if (er) throw er;
		
		files.map(file => {
			let pull = require(`./commands/${file}`);
			const command = file.replace('.js', '');
			
			client.commands.set(command, pull);
			pull.aliases.map(alias => client.commands.set(alias, pull));
			
			if (pull.description) {
				if (pull.category) {
					client.cmdInfo.set(command, {
						description: pull.description,
						category: pull.category,
						usage: pull.usage || null,
					});
					
					table.addRow(command, '✅');
				} else {
					table.addRow(command, '❌ → Missing Category Information');
				}
			} else {
				table.addRow(command, '❌  → Missing Description Information');
			}
		});
		
		console.log(table.toString());
	});

	await client.bans.defer;

	setInterval(function() {
		for (let [key, value] of client.bans) {
			const member = key;
			const guild = client.guilds.cache.first();
			const time = value.time;

			if (Date.now() >= time) {
				guild.members.unban(member, 'Ban time is up.');
				client.bans.delete(member);
			}
		}
	}, 1000);
	
	await client.mutes.defer;

	setInterval(function() {
		for (let [key, value] of client.mutes) {
			const member = client.guilds.cache.first().members.cache.get(key);
			const time = value.time;

			if  (!member) return;

			if (Date.now() >= time) {
				const embed = new MessageEmbed()
				.setTitle('Unmute Notice')
				.setColor('GREEN')
				.setDescription(`You were unmuted in **${client.guilds.cache.first().name}**.`);

				member.roles.remove('712364643724689441')
				client.mutes.delete(member.id);
				member.send(embed);
			}
		}
	}, 1000);
});

client.on('guildMemberAdd', async member => {
	await client.mutes.defer;

	if (client.mutes.has(member.id)) {
		member.roles.add('712365121485406378');
		member.roles.add('712364643724689441'); 
	}
});

client.on('error', console.error);

client.on('message', async msg => {
	client.Embedder = class {
		ErrorEmbed(desc) {
			let emb = new MessageEmbed()
			.setTitle('Error!')
			.setColor('RED')
			.setDescription(`${desc} <:xmark:712719440243982398>`)
			.setFooter(msg.author.username, msg.author.avatarURL())
			.setTimestamp();
			
			return msg.channel.send(emb);
		}
		
		SuccessEmbed(desc) {
			let emb = new MessageEmbed()
			.setTitle('Success!')
			.setColor('GREEN')
			.setDescription(`${desc} <:check:712719439644065802>`)
			.setFooter(msg.author.username, msg.author.avatarURL())
			.setTimestamp();
			
			return msg.channel.send(emb);
		}
		
		WarnEmbed(desc) {
			let emb = new MessageEmbed()
			.setTitle('Warning!')
			.setColor('ORANGE')
			.setDescription(`${desc} ⚠`)
			.setFooter(msg.author.username, msg.author.avatarURL())
			.setTimestamp();
			
			return msg.channel.send(emb);
		}
		
		LoadingEmbed(desc) {
			let emb = new MessageEmbed()
			.setTitle('Loading...')
			.setDescription(`${desc} <a:loading:712719440252370956>`)
			.setFooter(msg.author.username, msg.author.avatarURL())
			.setTimestamp();
			
			return msg.channel.send(emb);
		}
	}

	client.pause = ms => {
		return new Promise(resolve => setTimeout(resolve, ms));
	};

	if (msg.author.bot) return;
	if (!msg.content.startsWith('::')) return;

	let args = msg.content.split(' '),
		cmd = args.shift().toLowerCase().replace('::', '');

	if (client.commands.has(cmd)) {
		client.commands.get(cmd).run(client, msg, args);
	}
});

client.login(process.env.TOKEN);