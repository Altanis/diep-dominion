const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'kick',
	aliases: [],
    description: 'Kicks a user from the server.',
    usage: '::kick <user> [reason]',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        if (!client.checkPermission(msg.member, 'KICK_MEMBERS')) return PureEmbed.ErrorEmbed('You must have `Kick Members` permission to execute this command.')

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to kick, using UserMention or UserID.'); 
        if (msg.member.roles.highest.position <= member.roles.highest.position && !['445358112669564930', '649387521461059614'].includes(msg.member.id)) return PureEmbed.ErrorEmbed('Please specify a user you can kick manually!');
        if (msg.member.id == member.id) return PureEmbed.ErrorEmbed('You cannot kick yourself!');

        const reason = args.slice(1).join(' ') || 'No reason was specified.';

        PureEmbed.LoadingEmbed(`Kicking ${member.user} from server...`).then(async emb => {
            const embed = new MessageEmbed()
            .setTitle('Kick Notice')
            .setColor('ORANGE')
            .setDescription(`You were kicked from **${msg.guild.name}**.`)
            .addField('Author', msg.author.tag, true)
            .addField('Reason', reason, true);

            await member.send(embed);
            member.kick(`Kicked by ${msg.author.tag} ║ Reason: ${reason}`);
            emb.delete();
            PureEmbed.SuccessEmbed(`Successfully kicked ${member.user}!`);
        });
	},
};