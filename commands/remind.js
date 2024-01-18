function execute(msg, stats) {
    const prevtx = msg.content.substring(8).split("<");
    const num = prevtx[1].lastIndexOf(">");
    const dattbl = { pinguser: msg.author.id, length: prevtx[1].substring(num,0), msg: prevtx[1].substring(num+1) }
    msg.reply('Reminder set.')
    setTimeout(() => {
        msg.channel.send(`Reminder for <@${dattbl.pinguser}>: `+'``'+`${dattbl.msg}`+'``')
    },stats.argtosec(dattbl.length)*1000)
}
module.exports = {
    name: 'remind',
    execute: execute
}