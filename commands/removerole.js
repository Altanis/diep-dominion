const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'removerole',
    aliases: [],
    description: 'Adds a role to a user.',
    usage: '::removerole <UserMention/UserID> <RoleName/RoleID>',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        if (!client.checkPermission(msg.member, 'MANAGE_ROLES')) return PureEmbed.ErrorEmbed('You must have `Manage Roles` permission to execute this command.')

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to remove a role from, using UserMention or UserID.');

        const role = msg.guild.roles.cache.find(role => role.name == args.slice(1).join(' ')) || msg.guild.roles.cache.get(args[1]);
        if (!role) return PureEmbed.ErrorEmbed('The argument `<RoleName/RoleID>` was left out, or the role specified was invalid.');

        if (!member.roles.cache.has(role.id)) return PureEmbed.ErrorEmbed('That user does not have that role!');

        PureEmbed.LoadingEmbed(`Removing role from ${member.user}...`).then(async emb => {
            emb.delete();
            member.roles.remove(role);

            PureEmbed.SuccessEmbed(`Successfully removed the role **${role.name}** from: ${member.user}.`);
        });
    },
};