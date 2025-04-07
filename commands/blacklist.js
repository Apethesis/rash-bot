function execute(msg, stats) {
    if (msg.author.id == '1168868176189198418' || msg.member.roles.cache.some((id) => stats.authroles[id])) {
        const user = msg.content.substring(10)
        msg.guild.members.ban(user).catch((err) => {

        });
        stats.blacklisted[user] = true
        msg.channel.send('Blacklist successful >:3')
    }
}
module.exports = {
    name: 'blacklist',
    execute: execute
}