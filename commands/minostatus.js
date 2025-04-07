const { EmbedBuilder } = require('discord.js')
function execute(msg, stats) {
    if (stats.authchannels[msg.channelId]) {
        const response = fetch('https://presence.roblox.com/v1/presence/users', {
            method: 'POST',
            body: JSON.stringify(stats.body),
            headers: {'Content-Type': 'application/json'}
        }).then(x => x.json().then(data => ({
            data: data,
            status: x.status
        }))).then(res => stats.resp = res)
        if (stats.resp != undefined) {
            stats.oldstat = stats.status
            stats.status = {
                presenceType: stats.resp.data.userPresences[0].userPresenceType,
                location: stats.resp.data.userPresences[0].lastLocation,
                place: stats.resp.data.userPresences[0].gameId
            }
            if (stats.oldstat != undefined) {
                if (stats.status.location == "Website" && stats.status.presenceType == 1) {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Mino is wasting away the little time he has left instead of getting his ass in studio.')
                        .setDescription('On the website (its so minover........).')
                        .setFooter({ text: `Forced by ${msg.author.username}, ${stats.status.presenceType}` })
                    msg.channel.send({ embeds: [embed] })
                } else if (stats.status.location.includes('Studio') || stats.status.presenceType == 3) {
                    const embed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle('Mino is in studio, probably changing a few values and then closing it before actually working on shallot.')
                        .setDescription('In studio, this is good news.')
                        .setFooter({ text: `Forced by ${msg.author.username}, ${stats.status.presenceType}` })
                    msg.channel.send({ embeds: [embed] })
                } else if (stats.status.presenceType == 2 && !stats.status.location.includes('Studio') && stats.status.location != "Website") {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Mino is being a lazy fucking bitch again and playing roblox.')
                        .setDescription('Dissapointing the community (playing a roblox game)')
                        .setFooter({ text: `Forced by ${msg.author.username}, $stats.{status.presenceType}` })
                    msg.channel.send({ embeds: [embed] })
                } else if (stats.status.presenceType == 0) {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Mino is wasting away the little time he has and sleeping (or doing something irl).')
                        .setDescription('Offline.')
                        .setFooter({ text: `Forced by ${msg.author.username}, ${stats.status.presenceType}` })
                    msg.channel.send({ embeds: [embed] })
                }
            }
        }
    }
}
module.exports = {
    name: 'status',
    execute: execute
}