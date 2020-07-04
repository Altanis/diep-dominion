const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'addrole',
    aliases: [],
    description: 'Adds a role to a user.',
    usage: '::addrole <UserMention/UserID> <RoleName/RoleID>',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        if (!client.checkPermission(msg.member, 'MANAGE_ROLES')) return PureEmbed.ErrorEmbed('You must have `Manage Roles` permission to execute this command.')

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to add a role to, using UserMention or UserID.');

        const role = msg.guild.roles.cache.find(role => role.name == args.slice(1).join(' ')) || msg.guild.roles.cache.get(args[1]);
        if (!role) return PureEmbed.ErrorEmbed('The argument `<RoleName/RoleID>` was left out, or the role specified was invalid.');

        if (member.roles.cache.has(role.id)) return PureEmbed.ErrorEmbed('That user already has that role!');

        PureEmbed.LoadingEmbed(`Adding role to ${member.user}...`).then(async emb => {
            emb.delete();
            member.roles.add(role);

            PureEmbed.SuccessEmbed(`Successfully added the role **${role.name}** to: ${member.user}.`);
        });
    },
};