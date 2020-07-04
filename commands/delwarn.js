const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delwarn',
    aliases: [],
    description: 'Removes a warn from a user.',
    usage: '::delwarn <UserMention/UserID> <amount/"all">',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        await client.warns.defer;

        if (!msg.member.roles.cache.has('712721450611507321')) return PureEmbed.ErrorEmbed(`You do not have the role **Staff** to execute this command.`);

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to delete the warnof , using UserMention or UserID.');
        if (msg.member.id == member.id) return PureEmbed.ErrorEmbed('You cannot delete a warn from yourself!');

        const amount = args[1];

        const beforeWarns = client.warns.get(member.id) || 0;

        if (amount == 'all') {
            client.warns.delete(member.id);
            PureEmbed.SuccessEmbed(`Deleted all warns from ${member.user}.`);
        } else if (!isNaN(amount)) {
            const curWarns = (beforeWarns - amount) >= 0 ? beforeWarns - amount : 0;
            client.warns.set(member.id, curWarns);

            PureEmbed.SuccessEmbed(`${member.user} now has ${curWarns} warns!`);
        }
    },
};
