const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Gets the connection time from this bot to the Discord API in milliseconds',
    category: 'utility',
    run: (client, msg, _args) => {
        msg.channel.send('Pinging API... Will take a few moments.').then(message => {
            const p1 = `\`${message.createdAt - msg.createdAt}ms\``;
            const p2 = `\`${Math.round(client.ws.ping)}ms\``;

            client.pause(3000);
            
            message.edit(new MessageEmbed().setTitle('Pong! 🏓').setColor('GREEN').addField('Message Roundtrip', p1).addField('Websocket Heartbeat', p2).setTimestamp());
        });
    },
};