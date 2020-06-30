module.exports = {
    name: 'selfstaff',
    aliases: [],
    description: 'Gives staff to the user if they have Staff roles.',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        await client.warns.defer;

        if (!msg.member.roles.cache.has('712721510795837474') && !msg.member.roles.cache.has('712721541908922489') && !msg.member.roles.cache.has('712721560414453862') && !msg.member.roles.cache.has('712367876677435394')) return PureEmbed.ErrorEmbed(`You do not have any Staff roles to execute this command.`);
        
        msg.member.roles.add('712721450611507321');
        PureEmbed.SuccessEmbed(`The Staff role was added to you successfully!`)
    },
};
