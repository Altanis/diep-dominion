const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
};

const { ReactionCollector } = require('discord.js-collector');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Gives info on every command usable by the bot.',
    usage: '::help <command>',
    category: 'utility',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

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
            } else {
                const cmdNames = [];

                client.commands.map(command => {
                    cmdNames.push(command.name);
                });

                const uniqueArr = cmdNames.filter(function(item, pos) {
                    return cmdNames.indexOf(item) == pos;
                })

                PureEmbed.ErrorEmbed(`Please input a command to find info of. Available commands: \`${uniqueArr.join(', ')}\``);
            }
        } else  {
            const cmdNames = [];

            client.commands.map(command => {
                cmdNames.push(command.name);
            });

            const uniqueArr = cmdNames.filter(function(item, pos) {
                return cmdNames.indexOf(item) == pos;
            })

            PureEmbed.ErrorEmbed(`Please input a command to find info of. Available commands: \`${uniqueArr.join(', ')}\``);
        }
    },
};