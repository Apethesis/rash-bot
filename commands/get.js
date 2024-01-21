function execute(msg, stats) {
    const prevtx = msg.content.substring(4).split("<");
    const num = prevtx[1].lastIndexOf(">");
    const action = prevtx[1].substring(num,0).toLowerCase()
    const args = msg.content.split(' ')
    switch (action) {
        case 'stats':
            if (args[1]) {
                stats.baseUser.findOne({ where: { id: args[1].substring(2,args[1].length-1) }}).then((user) => {
                    if (user) {
                        msg.reply(`Level: ${user.lv}\nEXP: ${user.exp}\nBalance: ${user.rp} R-Points\nTo next level: ${Math.round(500 * ((1+(user.lv * 0.1))*user.lv)-user.exp)} EXP`)
                    } else {
                        stats.baseUser.create({
                            id: args[1].substring(2,args[1].length-1),
                            exp: 1,
                            lv: 1,
                            cmsg: 0,
                        })
                    }
                })
            } else {
                stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
                    if (user) {
                        msg.reply(`Level: ${user.lv}\nEXP: ${user.exp}\nBalance: ${user.rp} R-Points\nTo next level: ${Math.round(500 * ((1+(user.lv * 0.1))*user.lv)-user.exp)} EXP`)
                    } else {
                        stats.baseUser.create({
                            id: msg.author.id,
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
                attributes: ['id'],
                order: [sequelize.fn('max', sequelize.col('rp'))],
                limit: 10,
                group: ['baseUser.id']
            }).then((arr) => {
                let strig = 'Leaderboard:\n'
                for (let i in arr) {
                    msg.guild.members.fetch(arr[i].id).then((usr) => {
                        strig = strig+`${i}. ${usr.displayName} - ${arr[i].rp} R-Points\n`
                    }).catch((err) => { console.log(err); })
                }
                msg.reply(strig)
            }).catch((err) => { console.log(err); })
        case 'title':
            if (msg.member.roles.highest.id == '1198041664804106250' || msg.member.roles.highest.id == '1198046098703528106') {
                stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
                    if (user) {
                        const tstart = args[0].length + args[1].length + 2
                        const tcontent = msg.content.substring(tstart)
                        user.titles[user.titles.length] = tcontent
                    }
                })
            }

    }
}
module.exports = {
    name: 'get',
    execute: execute
}