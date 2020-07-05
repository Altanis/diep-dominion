module.exports = {
    name: 'perms',
    aliases: [],
    description: 'Gets the permissions of a role or user.',
    usage: '::perms <UserMention/UserID | RoleName/RoleID>',
    category: 'utility',
    run: async (client, msg, args) => {
        const PureEmbed = new client.Embedder();

        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        let role = msg.guild.roles.cache.find(role => role.name == args.join(' ')) || msg.guild.roles.cache.get(args[0]);

        if (!member) {
            const permissions = role.permissions;

            if (permissions.has('ADMINISTRATOR')) {
                msg.channel.send(`\`\`\`diff
+ Administrator
+ Create Instant Invite
+ Kick Members
+ Ban Members
+ Manage Channels
+ Manage Guild
+ Add Reactions
+ View Audit Log
+ Priority Speaker
+ Stream
+ View Channel
+ Send Messages
+ Send TTS Messages
+ Manage Messages
+ Embed Links
+ Attach Files
+ Read Message History
+ Mention Everyone, Here, and All Roles
+ Use External Emojis
+ View Guild Insights
+ Connect
+ Speak
+ Mute Members
+ Deafen Members
+ Move Members
+ Use V.A.D (Voice Activity Detection)
+ Change Nickname
+ Manage Nicknames
+ Manage Roles
+ Manage Webhooks
+ Manage Emojis\`\`\``)
            } else {
                const cii = permissions.has('CREATE_INSTANT_INVITE') ? '+' : '-';
                const kick = permissions.has('KICK_MEMBERS') ? '+' : '-';
                const ban = permissions.has('BAN_MEMBERS') ? '+' : '-';
                const channels = permissions.has('MANAGE_CHANNELS') ? '+' : '-';
                const guild = permissions.has('MANAGE_GUILD') ? '+' : '-';
                const rxn = permissions.has('ADD_REACTIONS') ? '+' : '-';
                const audit = permissions.has('VIEW_AUDIT_LOG') ? '+' : '-';
                const priority = permissions.has('PRIORITY_SPEAKER') ? '+' : '-';
                const stream = permissions.has('STREAM') ? '+' : '-';
                const channel = permissions.has('VIEW_CHANNEL') ? '+' : '-';
                const send = permissions.has('SEND_MESSAGES') ? '+' : '-';
                const tts = permissions.has('SEND_TTS_MESSAGES') ? '+' : '-';
                const msgs = permissions.has('MANAGE_MESSAGES') ? '+' : '-';
                const embed = permissions.has('EMBED_LINKS') ? '+' : '-';
                const attach = permissions.has('ATTACH_FILES') ? '+' : '-';
                const msghistory = permissions.has('READ_MESSAGE_HISTORY') ? '+' : '-';
                const mention = permissions.has('MENTION_EVERYONE') ? '+' : '-';
                const external = permissions.has('USE_EXTERNAL_EMOJIS') ? '+' : '-';
                const guildInsight = permissions.has('VIEW_GUILD_INSIGHTS') ? '+' : '-';
                const connect = permissions.has('CONNECT') ? '+' : '-';
                const speak = permissions.has('SPEAK') ? '+' : '-';
                const mute = permissions.has('MUTE_MEMBERS') ? '+' : '-';
                const deafen = permissions.has('DEAFEN_MEMBERS') ? '+' : '-';
                const mov = permissions.has('MOVE_MEMBERS') ? '+' : '-';
                const vad = permissions.has('USE_VAD') ? '+' : '-';
                const nick = permissions.has('CHANGE_NICKNAME') ? '+' : '-';
                const mnick = permissions.has('MANAGE_NICKNAMES') ? '+' : '-';
                const role = permissions.has('MANAGE_ROLES') ? '+' : '-';
                const webhook = permissions.has('MANAGE_WEBHOOKS') ? '+' : '-';
                const emoji = permissions.has('MANAGE_EMOJIS') ? '+' : '-';

                msg.channel.send(`\`\`\`diff
- Administrator
${cii} Create Instant Invite
${kick} Kick Members
${ban} Ban Members
${channels} Manage Channels
${guild} Manage Guild
${rxn} Add Reactions
${audit} View Audit Log
${priority} Priority Speaker
${stream} Stream
${channel} View Channel
${send} Send Messages
${tts} Send TTS Messages
${msgs} Manage Messages
${embed} Embed Links
${attach} Attach Files
${msghistory} Read Message History
${mention} Mention Everyone, Here, and All Roles
${external} Use External Emojis
${guildInsight} View Guild Insights
${connect} Connect
${speak} Speak
${mute} Mute Members
${deafen} Deafen Members
${mov} Move Members
${vad} Use V.A.D (Voice Activity Detection)
${nick} Change Nickname
${mnick} Manage Nicknames
${role} Manage Roles
${webhook} Manage Webhooks
${emoji} Manage Emojis\`\`\``)
            }
        } else if (!role) {
            const permissions = member.permissions;

            if (permissions.has('ADMINISTRATOR')) {
                msg.channel.send(`\`\`\`diff
+ Administrator
+ Create Instant Invite
+ Kick Members
+ Ban Members
+ Manage Channels
+ Manage Guild
+ Add Reactions
+ View Audit Log
+ Priority Speaker
+ Stream
+ View Channel
+ Send Messages
+ Send TTS Messages
+ Manage Messages
+ Embed Links
+ Attach Files
+ Read Message History
+ Mention Everyone, Here, and All Roles
+ Use External Emojis
+ View Guild Insights
+ Connect
+ Speak
+ Mute Members
+ Deafen Members
+ Move Members
+ Use V.A.D (Voice Activity Detection)
+ Change Nickname
+ Manage Nicknames
+ Manage Roles
+ Manage Webhooks
+ Manage Emojis\`\`\``)
            } else {
                const cii = permissions.has('CREATE_INSTANT_INVITE') ? '+' : '-';
                const kick = permissions.has('KICK_MEMBERS') ? '+' : '-';
                const ban = permissions.has('BAN_MEMBERS') ? '+' : '-';
                const channels = permissions.has('MANAGE_CHANNELS') ? '+' : '-';
                const guild = permissions.has('MANAGE_GUILD') ? '+' : '-';
                const rxn = permissions.has('ADD_REACTIONS') ? '+' : '-';
                const audit = permissions.has('VIEW_AUDIT_LOG') ? '+' : '-';
                const priority = permissions.has('PRIORITY_SPEAKER') ? '+' : '-';
                const stream = permissions.has('STREAM') ? '+' : '-';
                const channel = permissions.has('VIEW_CHANNEL') ? '+' : '-';
                const send = permissions.has('SEND_MESSAGES') ? '+' : '-';
                const tts = permissions.has('SEND_TTS_MESSAGES') ? '+' : '-';
                const msgs = permissions.has('MANAGE_MESSAGES') ? '+' : '-';
                const embed = permissions.has('EMBED_LINKS') ? '+' : '-';
                const attach = permissions.has('ATTACH_FILES') ? '+' : '-';
                const msghistory = permissions.has('READ_MESSAGE_HISTORY') ? '+' : '-';
                const mention = permissions.has('MENTION_EVERYONE') ? '+' : '-';
                const external = permissions.has('USE_EXTERNAL_EMOJIS') ? '+' : '-';
                const guildInsight = permissions.has('VIEW_GUILD_INSIGHTS') ? '+' : '-';
                const connect = permissions.has('CONNECT') ? '+' : '-';
                const speak = permissions.has('SPEAK') ? '+' : '-';
                const mute = permissions.has('MUTE_MEMBERS') ? '+' : '-';
                const deafen = permissions.has('DEAFEN_MEMBERS') ? '+' : '-';
                const mov = permissions.has('MOVE_MEMBERS') ? '+' : '-';
                const vad = permissions.has('USE_VAD') ? '+' : '-';
                const nick = permissions.has('CHANGE_NICKNAME') ? '+' : '-';
                const mnick = permissions.has('MANAGE_NICKNAMES') ? '+' : '-';
                const role = permissions.has('MANAGE_ROLES') ? '+' : '-';
                const webhook = permissions.has('MANAGE_WEBHOOKS') ? '+' : '-';
                const emoji = permissions.has('MANAGE_EMOJIS') ? '+' : '-';

                msg.channel.send(`\`\`\`diff
- Administrator
${cii} Create Instant Invite
${kick} Kick Members
${ban} Ban Members
${channels} Manage Channels
${guild} Manage Guild
${rxn} Add Reactions
${audit} View Audit Log
${priority} Priority Speaker
${stream} Stream
${channel} View Channel
${send} Send Messages
${tts} Send TTS Messages
${msgs} Manage Messages
${embed} Embed Links
${attach} Attach Files
${msghistory} Read Message History
${mention} Mention Everyone, Here, and All Roles
${external} Use External Emojis
${guildInsight} View Guild Insights
${connect} Connect
${speak} Speak
${mute} Mute Members
${deafen} Deafen Members
${mov} Move Members
${vad} Use V.A.D (Voice Activity Detection)
${nick} Change Nickname
${mnick} Manage Nicknames
${role} Manage Roles
${webhook} Manage Webhooks
${emoji} Manage Emojis\`\`\``)
            }
        } else {
            PureEmbed.ErrorEmbed('Please input a role or member to get the permissions of.');
        }
    },
};
