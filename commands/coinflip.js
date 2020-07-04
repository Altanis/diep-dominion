module.exports = {
    name: 'coinflip',
    aliases: [],
    description: 'Flips a coin.',
    category: 'utility',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        const number = Math.random().toFixed(2);

        if (number % 2 > 0.5) {
            PureEmbed.SuccessEmbed('The coin flipped: **Heads**');
        } else {
            PureEmbed.SuccessEmbed('The coin flipped: **Tails**');
        }
    },
};
