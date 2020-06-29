const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'eval',
	aliases: ['e', 'evaluate', 'try'],
	description: 'Evaluates raw JavaScript code.',
	usage: '::eval <code>',
	category: 'owner',
	run: async (client, msg, args) => {
		const embed = new MessageEmbed();
		
		try {
			let evalled = eval(args.join(' '));
			
			if (typeof evalled !== 'string')
			evalled = require('util').inspect(evalled);
			
			embed.setColor('GREEN');
			embed.setTitle('Evaluation Successful!');
			embed.setDescription('The evaluation ran successfully.');
			embed.addField('Inputted Code', `\`\`\`js\n${args.join(' ')}\`\`\``);
			embed.addField('Outputted Code', `\`\`\`js\n${evalled.includes(client.token) ? '🖕' : evalled}\`\`\``);
			
			msg.delete()
			msg.channel.send(embed);
		} catch (err) {
			embed.setColor('RED');
			embed.setTitle('Evaluation Unsuccessful!');
			embed.setDescription('The evaluation ran unsuccessfully.');
			embed.addField('Inputted Code', `\`\`\`js\n${args.join(' ')}\`\`\``);
			embed.addField(
				'Error',
				`\`\`\`js\n${err === client.token ? '🖕' : err}\`\`\``
				);

				msg.delete();
				
				msg.channel.send(embed);
			}
		},
	}