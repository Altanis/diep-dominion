const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lockdown',
    aliases: [],
    description: 'Locks a channel down, disabling everyone except Administrators from typing.',
    usage: '::lockdown [channel/"all"] --default:sent-channel',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();
        
        if (!client.checkPermission(msg.member, 'MANAGE_CHANNELS')) return PureEmbed.ErrorEmbed('You must have the `Manage Channels` permission to execute this command.');
        
        const channel = msg.mentions.channels.first() || msg.channel;
        
        if (args[0] == 'all') {
            PureEmbed.LoadingEmbed(`Locking down all channels...`).then(async emb => {
                ['712044704379699241', '712044762894565457', '712044826568294440'].map(id => {
                    const channel = msg.guild.channels.cache.get(id);
    
                    channel.updateOverwrite(msg.guild.roles.everyone, {
                        SEND_MESSAGES: false,
                    });
                });

                emb.delete();
                PureEmbed.SuccessEmbed(`Locked down all channels successfully!`);
            });
        } else {
            PureEmbed.LoadingEmbed(`Locking down <#${channel.id}>...`).then(async emb => {
                channel.updateOverwrite(msg.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                });

                emb.delete()
                PureEmbed.SuccessEmbed(`Locked down <#${channel.id}> successfully!`)
            });
        }
    },
};