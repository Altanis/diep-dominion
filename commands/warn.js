const { MessageEmbed } = require('discord.js') 
module.exports = {
    name: 'warn',
    aliases: [],
    description: 'Warns a user.',
    usage: '::warn <UserMention/UserID> <reason>',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        await client.warns.defer;

        if (!msg.member.roles.cache.has('712721450611507321')) return PureEmbed.ErrorEmbed(`You do not have the role **Staff** to execute this command.`);

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to warn, using UserMention or UserID.');
        if (msg.member.id == member.id) return PureEmbed.ErrorEmbed('You cannot warn yourself!');

        const reason = args.slice(1).join(' ') || 'No reason specified.';

        PureEmbed.LoadingEmbed(`Warning ${member.user}...`).then(emb => {
            const beforeWarns = client.warns.get(member.id) || 0;

            const embed = new MessageEmbed()
            .setTitle('Warn Notice')
            .setColor('ORANGE')
            .setDescription(`You were warned in **${msg.guild.name}**.`)
            .addField('Author', msg.author.tag, true)
            .addField('Reason', reason, true)
            .addField('Warn Amount', beforeWarns + 1, true)

            member.send(embed);
            client.warns.set(member.id, beforeWarns + 1);
            emb.delete();
            PureEmbed.SuccessEmbed(`Warned ${member.user} successfully!`);
        });
    },
};
