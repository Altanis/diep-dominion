module.exports = {
	name: 'purge',
	aliases: ['clear', 'delmsgs'],
	description: 'Clears a specific amount in general, from a specific user, and all bots.',
	usage: '::purge <UserMention/"bots"> <messages>',
	category: 'mod',
	run: async (client, msg, args) => {
		const PureEmbed = new client.Embedder();

		if (!client.checkPermission(msg.member, 'MANAGE_MESSAGES')) return PureEmbed.ErrorEmbed('You must have `Manage Messages` permission to execute this command.')
	
		const number = parseInt(args[1]) || 100;
		
		if (msg.mentions.members.first()) {
			const member = msg.mentions.members.first();

			if (number == 0) return;
			if (number > 100) return PureEmbed.ErrorEmbed('The argument `number` must be 100 or below.');
			if (isNaN(number)) return PureEmbed.ErrorEmbed(`The argument \`number\` must be an integer between 1 and 100. Usage: \`$purge @User 50\``);
			
			PureEmbed.LoadingEmbed(`Purging **${number}** messages by **${member.user}**...`).then(embed => {
				msg.channel.messages.fetch({ limit: 100 }).then(msgArr => {
					msgArr = msgArr.array();
					msgArr = msgArr.filter(message => message.author.id == member.id);
					msgArr.length = number + 1;

					msgArr.map(m => m.delete());

					embed.edit(PureEmbed.SuccessEmbed(`Successfully purged **${number}** messages from **${member.user}**!`));
				});
			});	
		} else if (args[0].toLowerCase() == 'bot' || args[0].toLowerCase() == 'bots') {
			if (number == 0) return;
			if (number > 100) return PureEmbed.ErrorEmbed('The argument `number` must be 100 or below.');
			if (isNaN(number)) return PureEmbed.ErrorEmbed(`The argument \`number\` must be an integer between 1 and 100. Usage: \`$purge @User 50\``);
			
			PureEmbed.LoadingEmbed(`Purging **${number}** messages by all bots...`).then(embed => {
				msg.channel.messages.fetch({ limit: 100 }).then(msgArr => {
					msgArr = msgArr.array();
					msgArr = msgArr.filter(message => message.author.bot);
					msgArr.length = number;

					msg.delete();
					msgArr.map(m => m.delete());

					embed.edit(PureEmbed.SuccessEmbed(`Successfully purged **${number}** messages from all bots!`));
				});
			});	
		} else {
			if (number == 0) return;
			if (number > 100) return PureEmbed.ErrorEmbed('The argument `number` must be 100 or below.');
			if (isNaN(number)) return PureEmbed.ErrorEmbed(`The argument \`number\` must be an integer between 1 and 100. Usage: \`$purge @User 50\``);
			
			PureEmbed.LoadingEmbed(`Purging **${number}** messages by all bots...`).then(embed => {
				msg.channel.messages.fetch({ limit: 100 }).then(msgArr => {
					msgArr = msgArr.array();
					msgArr.length = number + 1;
					
					msgArr.map(m => m.delete());

					embed.edit(PureEmbed.SuccessEmbed(`Successfully purged **${number}** messages from all bots!`));
				});
			});	
		}
	},
};