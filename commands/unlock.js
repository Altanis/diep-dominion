const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unlock',
    aliases: [],
    description: 'Unlocks  a locked channel.',
    usage: '::unlock [channel/"all"] --default:sent-channel',
    category: 'mod',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        if (!client.checkPermission(msg.member, 'MANAGE_CHANNELS')) return PureEmbed.ErrorEmbed('You must have the `Manage Channels` permission to execute this command.');

        const channel = msg.mentions.channels.first() || msg.channel;
        
        if (args[0] == 'all') {
            ['712044704379699241', '712044762894565457', '712044826568294440'].map(id => {
                const channel = msg.guild.channels.cache.get(id);

                channel.updateOverwrite(msg.guild.roles.everyone, {
                    SEND_MESSAGES: null,
                });
            });

            PureEmbed.SuccessEmbed(`Unlocked all channels successfully!`);
        } else {
            PureEmbed.LoadingEmbed(`Unlocking <#${channel.id}>...`).then(async emb => {
                channel.updateOverwrite(msg.guild.roles.everyone, {
                    SEND_MESSAGES: null,
                });

                emb.delete();
                PureEmbed.SuccessEmbed(`Successfully unlocked <#${channel.id}>!`);
            });
        }
    },
};