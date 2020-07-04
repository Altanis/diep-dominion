module.exports = {
    name: 'verify',
    aliases: [],
    description: 'Verifies a user.',
    usage: '::verify <UserMention/UserID>',
    category: 'mod',
    run: async (client, msg, args) => {
        await client.mutes.defer;

        const PureEmbed = new client.Embedder();

        if (!msg.member.roles.cache.has('712721450611507321')) return PureEmbed.ErrorEmbed('You must have the `Staff` role to execute this command.')

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to verify, using UserMention or UserID.');

        member.roles.remove('712364745805660221');
        member.roles.add('712365121485406378');

        PureEmbed.SuccessEmbed('User verified successfully!');
    },
};