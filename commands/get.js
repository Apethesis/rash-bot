function execute(msg, stats) {
    const prevtx = msg.content.substring(4).split("<");
    const num = prevtx[1].lastIndexOf(">");
    const action = prevtx[1].substring(num,0).toLowerCase()
    const args = msg.content.split(' ')
    switch (action) {
        case 'stats':
            if (args[1]) {
                stats.baseUser.findOne({ where: { uid: args[1].substring(2,args[1].length-1) }}).then((user) => {
                    if (user) {
                        msg.reply(`Level: ${user.lv}\nEXP: ${user.exp}\nBalance: ${user.rp} R-Points\nTo next level: ${Math.round(500 * ((1+(user.lv * 0.1))*user.lv)-user.exp)} EXP`)
                    } else {
                        stats.baseUser.create({
                            uid: args[1].substring(2,args[1].length-1),
                            exp: 1,
                            lv: 1,
                            cmsg: 0,
                        })
                    }
                })
            } else {
                stats.baseUser.findOne({ where: { uid: msg.author.id }}).then((user) => {
                    if (user) {
                        msg.reply(`Level: ${user.lv}\nEXP: ${user.exp}\nBalance: ${user.rp} R-Points\nTo next level: ${Math.round(500 * ((1+(user.lv * 0.1))*user.lv)-user.exp)} EXP`)
                    } else {
                        stats.baseUser.create({
                            uid: msg.author.id,
                            exp: 1,
                            lv: 1,
                            cmsg: 0,
                        })
                    }
                })
            }
            break
        case 'leaderboard':
            stats.baseUser.findAll({ 
                order: [[stats.rshdb.fn('max',stats.rshdb.col('rp')), 'DESC']],
                limit: 10,
            }).then((arr) => {
                let strig = 'Leaderboard:\n'
                for (let i in arr) {
                    msg.guild.members.fetch(arr[i].uid).then((usr) => {
                        strig = strig+`${i}. ${usr.displayName} - ${arr[i].rp} R-Points\n`
                    }).catch((err) => { console.log(err); })
                }
                msg.reply(strig)
            }).catch((err) => { console.log(err); })

    }
}
module.exports = {
    name: 'get',
    execute: execute
}