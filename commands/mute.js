const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    aliases: [],
    description: 'Mutes a user, disabling them from speaking.',
    usage: '::mute <UserMention/UserID> <time> <reason>',
    category: 'mod',
    run: async (client, msg, args) => {
        await client.mutes.defer;

        const PureEmbed = new client.Embedder();

        if (!client.checkPermission(msg.member, 'MANAGE_ROLES')) return PureEmbed.ErrorEmbed('You must have `Manage Roles` permission to execute this command.')

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to mute, using UserMention or UserID.');
        if (msg.member.id == member.id) return PureEmbed.ErrorEmbed('You cannot mute yourself!');

        const time = /^[a-zA-Z]+$/.test(args[1]) ? Infinity : ms(args[1]);
        let reason = isFinite(time) ? args.slice(2).join(' ') : args.slice(1).join(' ');
        reason = reason || 'No reason specified.';

        PureEmbed.LoadingEmbed(`Muting ${member.user}...`).then(async emb => {
            const embed = new MessageEmbed()
            .setTitle('Mute Notice')
            .setColor('RED')
            .setDescription(`You were muted in **${msg.guild.name}**.`)
            .addField('Time', isFinite(time) ? ms(time, { long: true }) : 'Forever.')
            .addField('Author', msg.author.tag, true)
            .addField('Reason', reason, true);

            await member.send(embed);
            emb.delete();
            member.roles.add('712364643724689441');

            if (isFinite(time)) {
                client.mutes.set(member.id, {
                    time: Date.now() + time,
                    guild: msg.guild,
                    member: member.id,
                });
            }

            PureEmbed.SuccessEmbed(`Successfully muted ${member.user} for**${ isFinite(time) ? ` ${ms(time, { long: true })}` : 'ever until someone unmutes him' }**.`);
        });
    },
};