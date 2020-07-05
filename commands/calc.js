const mathjs = require('mathjs');

module.exports = {
    name: 'calc',
    aliases: ['calculator'],
    description: 'Returns the value from an expression.',
    usage: '::calc <expression>',
    category: 'utility',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        if (!args[0]) return PureEmbed.ErrorEmbed('No expression was inputted.');

        try {
            const evalled = mathjs.evaluate(args.join(' '));

            PureEmbed.SuccessEmbed(`The result to your expression is: **${evalled}**`)
        } catch (error) {
            PureEmbed.ErrorEmbed(`The expression you inputted was unable to be parsed. \nError: \`${error.message}\``)
        }
    },
};
