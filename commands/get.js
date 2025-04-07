const {Sequelize, DataTypes, Op} = require('sequelize');
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
                        msg.reply(`Level: ${user.lv}\nEXP: ${user.exp}\nBalance: ${user.rp} R-Points\nBank Balance: ${user.bankbalance}/${user.banklimit} R-Points\nTo next level: ${Math.round(500 * ((1+(user.lv * 0.1))*user.lv)-user.exp)} EXP`)
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
                        msg.reply(`Level: ${user.lv}\nEXP: ${user.exp}\nBalance: ${user.rp} R-Points\nBank Balance: ${user.bankbalance}/${user.banklimit} R-Points\nTo next level: ${Math.round(500 * ((1+(user.lv * 0.1))*user.lv)-user.exp)} EXP`)
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
                order: [Sequelize.fn('max', Sequelize.col('rp'))],
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
            break
        case 'title':
            if (msg.member.roles.highest.id == '1198041664804106250' || msg.member.roles.highest.id == '1198046098703528106') {
                if (args[1] == 'give') {
                    stats.baseUser.findOne({ where: { id: args[2].substring(2,args[2].length-1) }}).then((user) => {
                        if (user) {
                            const tcontent = msg.content.substring(args[0].length + args[1].length + args[2].length + 3)
                            const titles = JSON.parse(user.titles)
                            titles[Object.keys(titles).length+1] = tcontent+' '
                            user.titles = JSON.stringify(titles)
                            user.save()
                        }
                    })
                } else {
                    stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
                        if (user) {
                            const tcontent = msg.content.substring(12)
                            const titles = JSON.parse(user.titles)
                            titles[Object.keys(titles).length+1] = tcontent+' '
                            user.titles = JSON.stringify(titles)
                            user.save()    
                        }
                    })
                }
            }
            break
        case 'user':
            stats.baseUser.findOne({ where: { id: args[1].substring(2,args[1].length-1) }}).then((user) => {
                if (user) {
                    msg.reply(`Stat is equal to ${user[args[2]]}`)
                } else {
                    msg.reply(`Invalid user.`)
                }
            })
            break

    }
}
module.exports = {
    name: 'get',
    execute: execute
}