function execute(msg, stats) {
    const ticktock = msg.content.substring(8).toLowerCase()
    if (msg.author.id == '1168868176189198418' || msg.member.roles.highest.id == '1192565756899102830') {
        const btag = stats.basetag.destroy({ where: { name: ticktock }}).then(() => {
            msg.reply('Tag deleted.') 
        }).catch(() => {
            msg.reply(`Failed to delete tag, tag likely doesn't exist`)
        })
    }
}
module.exports = {
    name: 'deltag',
    execute: execute
}