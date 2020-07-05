module.exports = {
    name: 'avatar',
    aliases: [],
    description: 'Displays a user\'s avatar, and if none inputted, your own avatar.',
    category: 'utility',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) member = msg.member;

        const avatar = member.user.displayAvatarURL();

        msg.channel.send({
            files: [avatar],
        });
    },
};
