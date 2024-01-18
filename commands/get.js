function execute(msg, stats) {
    const prevtx = msg.content.substring(4).split("<");
    const num = prevtx[1].lastIndexOf(">");
    const action = prevtx[1].substring(num,0).toLowerCase()
    const args = msg.content.split(' ')
    switch (action) {
        case 'stats':
            stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
                if (user) {
                    msg.reply(`Level: ${user.lv}\nEXP: ${user.exp}\nTo next level: ${500 * (user.lv * 0.25)-user.exp} EXP`)
                } else {
                    stats.baseUser.create({
                        id: msg.author.id,
                        exp: 1,
                        lv: 1,
                        cmsg: 0,
                    })
                }
            })
            break
    }
    const btag = stats.basetag.findOne({ where: { name: ticktock }}).then((tag) => {
        if (tag) {
            msg.reply('```\n'+tag.get('content')+'``` '+`by ${tag.get('creator')}`)
        } else {
            msg.reply('Tag does not exist.')
        }
    }).catch(() => {})
}
module.exports = {
    name: 'get',
    execute: execute
}