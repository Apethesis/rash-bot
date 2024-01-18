function execute(msg, stats) {
    const ticktock = msg.content.substring(6).toLowerCase()
    const btag = stats.basetag.findOne({ where: { name: ticktock }}).then((tag) => {
        if (tag) {
            msg.reply('```\n'+tag.get('content')+'``` '+`by ${tag.get('creator')}`)
        } else {
            msg.reply('Tag does not exist.')
        }
    }).catch(() => {})
}
module.exports = {
    name: 'ptag',
    execute: execute
}