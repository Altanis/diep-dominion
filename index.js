require('dotenv/config');
require('./server');

const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const ASCII = require('ascii-table');
const Enmap = require('enmap');
const moment = require('moment');
const pastebinapi = require('pastebin-js');
const pastebin = new pastebinapi({
	'api_dev_key': process.env.DEVKEY,
	'api_user_name': process.env.USERNAME,
	'api_user_password': process.env.PASSWORD,
});

const table = new ASCII().setHeading('Command', 'Status');

const client = new Client();

client.commands = new Collection();
client.cmdInfo = new Collection();
client.checkPermission = (argument, permission_node = 'ADMINISTRATOR') => {
	return argument.permissions.has(permission_node);
};

client.bans = new Enmap({ name: 'bans' });
client.mutes = new Enmap({ name: 'mutes' });
client.warns = new Enmap({ name: 'warns' });

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
	
	setInterval(() => {
        let bots = client.guilds.cache.first().members.cache.filter(m => m.user.bot).size;
        let users = client.guilds.cache.first().members.cache.filter(m => !m.user.bot).size;
        let emojis = client.guilds.cache.first().emojis.cache.size;
        let channels = client.guilds.cache.first().channels.cache.filter(c => c.type == 'text' || c.type === 'voice').size;

        client.channels.cache.get('712363667165020221').setName(`Users: ${users}`);
        client.channels.cache.get('712363718922600469').setName(`Bots: ${bots}`);
        client.channels.cache.get('712363849575301182').setName(`Emojis: ${emojis}`);
        client.channels.cache.get('712363821628653666').setName(`Channels: ${channels}`);
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

	member.roles.add('712364745805660221');
	client.channels.cache.get('711962365054287872').send(new MessageEmbed().setTitle(`Welcome ${member.user.username}!`).setDescription('You have just joined Diep Dominion Maintanence, however, as an anti-raid measure, you must answer questions and get verified by staff.').addField('#1', 'Who invited you?').addField('#2', 'What is your favorite color?').addField('#3', 'What tank do you main?').setTimestamp());

	client.channels.cache.get('711969835398987797').send(`Welcome ${member.user}! You have just joined! We now have **${client.guilds.cache.first().members.cache.filter(m => !m.user.bot).size}** members! Thank you for joining!`);

	const embed = new MessageEmbed()
	.setAuthor('Member Join!', member.user.avatarURL())
	.setColor('BLUE')
	.addField('Member Tag', member.user.tag)
	.addField('Joined At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed);
});

client.on('guildMemberRemove', async member => {
	const embed = new MessageEmbed()
	.setAuthor('Member Leave!', member.user.avatarURL())
	.setColor('BLUE')
	.addField('Member Tag', member.user.tag)
	.addField('Joined At', member.joinedAt.toDateString())
	.addField('Left At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed);
});

client.on('guildCreate', guild => guild.leave());

client.on('channelCreate', async channel => {
	const embed = new MessageEmbed()
	.setAuthor('Channel Created!', client.user.avatarURL())
	.setColor('GREEN')
	.addField('Channel Name', channel.name)
	.addField('Type', channel.type)
	.addField('Channel Category', channel.parent.name)
	.addField('Channel Created At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('channelDelete', async channel => {
	const embed = new MessageEmbed()
	.setAuthor('Channel Deleted!', client.user.avatarURL())
	.setColor('GREEN')
	.addField('Channel Name', channel.name)
	.addField('Type', channel.type)
	.addField('Channel Category', channel.parent.name)
	.addField('Channel Created At', channel.createdAt.toDateString())
	.addField('Channel Deleted At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('emojiCreate', async emoji => {
	const embed = new MessageEmbed()
	.setAuthor('Emoji Created!', client.user.avatarURL())
	.setColor('GREEN')
	.addField('Emoji Name', emoji.name)
	.addField('Is Animated', (emoji.animated ? 'Yes' : 'No'))
	.addField('Emoji Display', emoji.toString())
	.addField('Created At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('emojiDelete', async emoji => {
	const embed = new MessageEmbed()
	.setAuthor('Emoji Deleted!', client.user.avatarURL())
	.setColor('RED')
	.addField('Emoji Name', emoji.name)
	.addField('Is Animated', (emoji.animated ? 'Yes' : 'No'))
	.addField('Created At', emoji.createdAt.toDateString())
	.addField('Deleted At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
    const difference = Object.keys(oldEmoji).filter(k => oldEmoji[k] !== newEmoji[k])[0];
	
	const embed = new MessageEmbed()
	.setAuthor('Emoji Updated!', client.user.avatarURL())
	.setColor('YELLOW')
	.addField(`Old Emoji ${difference.charAt(0).toUpperCase() + difference.replace(difference.charAt(0), '')}`, oldEmoji[difference])
	.addField(`New Emoji ${difference.charAt(0).toUpperCase() + difference.replace(difference.charAt(0), '')}`, newEmoji[difference])
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('guildBanAdd', async (_guild, user) => {
	const embed = new MessageEmbed()
	.setAuthor('Member Banned!', client.user.avatarURL())
	.setColor('RED')
	.addField('Member Tag', user.tag)
	.addField('Member ID', user.id)
	.addField('Banned At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('guildBanRemove', async (guild, user) => {
	const embed = new MessageEmbed()
	.setAuthor('Member Unbanned!', client.user.avatarURL())
	.setColor('GREEN')
	.addField('Member Tag', user.tag)
	.addField('Member ID', user.id)
	.addField('Unbanned At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
    const difference = Object.keys(oldGuild).filter(k => oldGuild[k] !== newGuild[k])[0];
	
	const embed = new MessageEmbed()
	.setAuthor('Guild Updated!', client.user.avatarURL())
	.setColor('YELLOW')
	.addField(`Old Guild ${difference.charAt(0).toUpperCase() + difference.replace(difference.charAt(0), '')}`, oldGuild[difference])
	.addField(`New Guild ${difference.charAt(0).toUpperCase() + difference.replace(difference.charAt(0), '')}`, newGuild[difference])
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('messageDeleteBulk', async messages => {
	let arr = [];
	messages.map(message => {
		arr.push(`${message.content ? message.content : message.embeds[0].description} by: ${message.author.tag}`);
	});

	const str = arr.join('\n');

	pastebin.createPaste(str, 'Deleted Messages').then(data => {
		const embed = new MessageEmbed()
		.setAuthor('Bulk Delete', client.user.avatarURL())
		.setColor('BLUE')
		.addField('Channel Bulk Deleted In', messages.first().channel.name)
		.addField('Bulk Delete Amount', messages.size)
		.addField('Messages', data)
		.setFooter('Diep Dominion Logging', client.user.avatarURL())
		.setTimestamp();
	
		client.channels.cache.get('711969933046710272').send(embed); 
	}).fail(err => {
		const embed = new MessageEmbed()
		.setAuthor('Bulk Delete', client.user.avatarURL())
		.setColor('BLUE')
		.addField('Channel Bulk Deleted In', messages.first().channel.name)
		.addField('Bulk Delete Amount', messages.size)
		.addField('Messages', `Failure to create paste ; Error: ${err}`)
		.setFooter('Diep Dominion Logging', client.user.avatarURL())
		.setTimestamp();
	
		client.channels.cache.get('711969933046710272').send(embed); 
	})
});

client.on('roleCreate', async role => {
	const embed = new MessageEmbed()
	.setAuthor('Role Created!', client.user.avatarURL())
	.setColor('GREEN')
	.addField('Role Name', role.name)
	.addField('Role ID', role.id)
	.addField('Created At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('roleDelete', async role => {
	const embed = new MessageEmbed()
	.setAuthor('Role Deleted!', client.user.avatarURL())
	.setColor('RED')
	.addField('Role Name', role.name)
	.addField('Created At', role.createdAt.toDateString())
	.addField('Deleted At', moment().format('MMMM Do YYYY, h:mm:ss A'))
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('roleUpdate', async (oldRole, newRole) => {
    const difference = Object.keys(oldRole).filter(k => oldRole[k] !== newRole[k])[0];
	
	const embed = new MessageEmbed()
	.setAuthor('Role Updated!', client.user.avatarURL())
	.setColor('YELLOW')
	.addField(`Old Role ${difference.charAt(0).toUpperCase() + difference.replace(difference.charAt(0), '')}`, oldRole[difference])
	.addField(`New Role ${difference.charAt(0).toUpperCase() + difference.replace(difference.charAt(0), '')}`, newRole[difference])
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed); 
});

client.on('messageDelete', async msg => {
	const embed = new MessageEmbed()
	.setAuthor('Message Deleted!', msg.author.avatarURL())
	.setColor('RED')
	.addField('Content', msg.content)
	.addField('Author', msg.author.tag)
	.setFooter('Diep Dominion Logging', msg.author.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed);
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
	if (!oldMsg.content || !newMsg.content) return;
	
	const embed = new MessageEmbed()
	.setAuthor('Message Edited!', newMsg.author.avatarURL())
	.setColor('ORANGE')
	.addField('Old Content', oldMsg.content)
	.addField('New Content', newMsg.content)
	.addField('Author', newMsg.author)
	.setFooter('Diep Dominion Logging', client.user.avatarURL())
	.setTimestamp();

	client.channels.cache.get('711969933046710272').send(embed);
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