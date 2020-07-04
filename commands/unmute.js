const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    aliases: [],
    description: 'Unmutes a user.',
    usage: '::unmute <UserMention/UserID>',
    category: 'mod',
    run: async (client, msg, args) => {
        await client.mutes.defer;

        const PureEmbed = new client.Embedder();

        if (!client.checkPermission(msg.member, 'MANAGE_ROLES')) return PureEmbed.ErrorEmbed('You must have `Manage Roles` permission to execute this command.')

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to unmute, using UserMention or UserID.');
        if (!member.roles.cache.has('712364643724689441')) return PureEmbed.ErrorEmbed('That user is not muted!');

        PureEmbed.LoadingEmbed(`Unmuting ${member.user}...`).then(async emb => {
            const embed = new MessageEmbed()
            .setTitle('Unmute Notice')
            .setColor('GREEN')
            .setDescription(`You were unmuted in **${msg.guild.name}**.`)
            .addField('Author', msg.author.tag, true);

            await member.send(embed);
            emb.delete();
            member.roles.remove('712364643724689441');

            client.mutes.delete(member.id);

            PureEmbed.SuccessEmbed(`Successfully unmuted ${member.user}.`);
        });
    },
};