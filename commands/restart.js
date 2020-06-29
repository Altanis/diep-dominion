module.exports = {
	name: 'restart',
	aliases: ['re'],
	description: 'Restarts the bot.',
	category: 'owner',
	run: async (client, msg, _args) => {
		if (msg.author.id != '649387521461059614' && msg.author.id != '445358112669564930') return;

		const RichEmbed = new client.Embedder();
		await RichEmbed.SuccessEmbed('Restarted bot successfully!').then(() => {
			process.exit();
		});
	},
};