const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Gives info on every command usable by the bot.',
    usage: '::mute <UserMention/UserID> <time> <reason>',
    category: 'utility',
    run: async (client, msg, args) => {
        if (args[0]) { 
            const command = args[0];
            const pullRequest = client.commands.get(command);

            if (pullRequest) {
                const embed = new MessageEmbed()
                .setTitle(`Command Name: **${pullRequest.name}**`)
                .setColor('GREEN')
                .addFields([
                    {
                        name: 'Command Description',
                        value: pullRequest.description || 'No description was provided.',
                        inline: true,
                    },
                    {
                        name: 'Command Usage',
                        value: pullRequest.usage ? `\`${pullRequest.usage}\`` : `\`::${pullRequest.name}\``,
                        inline: true,
                    }, 
                    {
                        name: 'Command Aliases',
                        value: pullRequest.aliases[0] ? pullRequest.aliases.join(', ') : 'No aliases were provided.',
                        inline: true,
                    },
                    {
                        name: 'Category',
                        value: `\`${pullRequest.category}\``,
                        inline: true,
                    }
                ]);

                msg.channel.send(embed);
            }
        }
    },
};