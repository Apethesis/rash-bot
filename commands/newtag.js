function mergemap(map) {
    const mstring = ""
    for (k in map) {
        mstring = mstring+map[k]
    }
    return mstring
}
function execute(msg, stats) {
    const args = msg.content.split(' ')
    const tstart = args[0].length + args[1].length + 2
    const tcontent = msg.content.substring(tstart)
    if (tcontent.length > 1) {
        const tag = stats.basetag.create({
            name: args[1].toLowerCase(),
            creator: msg.member.displayName,
            content: tcontent,
        }).then(() => {
            msg.reply('Tag created.')
        }).catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                msg.reply('That tag already exists.');
            }
        })
    } else {
        msg.reply('Cannot create an empty tag.')
    }
}
module.exports = {
    name: 'newtag',
    execute: execute
}