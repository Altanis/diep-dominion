module.exports = {
    name: 'warns',
    aliases: [],
    description: 'Gets the warns of a user.',
    usage: '::warns <UserMention/UserID>',
    category: 'utility',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        await client.warns.defer;

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) member = msg.member;

        const warnAmt = client.warns.get(member.id) || 0;

        PureEmbed.SuccessEmbed(`That user has **${warnAmt}** warns.`);
    },
};
