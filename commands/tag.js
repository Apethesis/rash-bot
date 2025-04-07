function execute(msg, stats) {
    let ticktock
    if (msg.author.id == '1177722822420877353' && msg.channel.guildId != '1185654470957338675') {
        ticktock = msg.content.split(" ")[2].toLowerCase()
    } else if (msg.content.substring(0,1) == "\\") {
        ticktock = msg.content.substring(1).toLowerCase()
    } else {
        ticktock = msg.content.substring(5).toLowerCase()
    }
    if (stats.truetags[ticktock]) {
        msg.reply({ files: [`./tags/${stats.truetags[ticktock]}`] })
    } else if ((msg.author.id == '1168868176189198418' || msg.member.roles.highest.id == '1192565756899102830' ) && stats.secrettags[ticktock]) {
        msg.reply({ files: [`./tags/${stats.secrettags[ticktock]}`] })
    }
}
module.exports = {
    name: 'tag',
    execute: execute
}