module.exports = {
    name: 'emoji',
    aliases: [],
    description: 'Displays a supersized image of an emoji as a GIF or PNG image.',
    category: 'utility',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        const parsedEmojiArr = args[0].match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/);

        const emoji = msg.guild.emojis.cache.find(emoji => emoji.name == parsedEmojiArr[2]) || msg.guild.emojis.cache.get(parsedEmojiArr[3]);
        if (!emoji) return PureEmbed.ErrorEmbed('No emoji was inputted, or an invalid emoji was inputted. Emojis must be accessible by the bot and created by the guild. If you would like to see an emoji added, please use the `::suggest` command.');

        const url = emoji.animated ? `https://cdn.discordapp.com/emojis/${parsedEmojiArr[3]}.gif` : `https://cdn.discordapp.com/emojis/${parsedEmojiArr[3]}.png`;

        msg.channel.send({
            files: [url],
        });
    },
};
