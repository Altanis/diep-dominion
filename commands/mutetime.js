const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mutetime',
    aliases: [],
    description: 'Checks the mutetime of a user.',
    usage: '::mutetime <UserMention/UserID>',
    category: 'utility',
    run: async (client, msg, args) => {
        await client.mutes.defer;
        const PureEmbed = new client.Embedder();

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a member you would like to view the mute time of.');

        if (!client.mutes.get(member.id)) return PureEmbed.ErrorEmbed('That user is not muted by this bot, or was permanently muted.');

        const time = ms(Date.now() - client.mutes.get(member.id, 'time'), { long: true });

        PureEmbed.SuccessEmbed(`${member.user} has ${time} left to complete his mute!`)
    },
};