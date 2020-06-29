const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'ban',
    aliases: [],
    description: 'Bans a user from the server, which can be with a time limit.',
    usage: '::ban <UserMention/UserID> <time> <reason>',
    category: 'mod',
    run: async (client, msg, args) => {
        await client.bans.defer;
        
        const PureEmbed = new client.Embedder();
        
        if (!client.checkPermission(msg.member, 'BAN_MEMBERS')) return PureEmbed.ErrorEmbed('You must have `Ban Members` permission to execute this command.')
        
        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) return PureEmbed.ErrorEmbed('Please specify a user to ban, using UserMention or UserID.'); 
        if (msg.member.roles.highest.position <= member.roles.highest.position && !['445358112669564930', '649387521461059614'].includes(msg.member.id)) return PureEmbed.ErrorEmbed('Please specify a user you can ban manually!');
        if (msg.member.id == member.id) return PureEmbed.ErrorEmbed('You cannot ban yourself!');
        
        const id = member.id;
        
        const time = /^[a-zA-Z]+$/.test(args[1]) ? Infinity : ms(args[1]);
        let reason = isFinite(time) ? args.slice(2).join(' ') : args.slice(1).join(' ');
        reason = reason || 'No reason specified.';
        
        PureEmbed.LoadingEmbed(`Banning ${member.user} from server...`).then(async emb => {
            const embed = new MessageEmbed()
            .setTitle('Ban Notice')
            .setColor('RED')
            .setDescription(`You were banned from **${msg.guild.name}**.`)
            .addField('Time', isFinite(time) ? ms(time, { long: true }) : 'Forever.')
            .addField('Author', msg.author.tag, true)
            .addField('Reason', reason, true);
            
            await member.send(embed);
            msg.guild.members.ban(id, {
                reason: `Banned by ${msg.author.tag} ║ Reason: ${reason}`,
            });
            emb.delete();
            
            if (isFinite(time)) {
                client.bans.set(id, {
                    time: Date.now() + time,
                    guild: msg.guild,
                    member: id,
                });
            }
            
            PureEmbed.SuccessEmbed(`Successfully banned ${member.user}!`);
        });
    },
};