function execute(msg, stats) {
    const args = msg.content.split(' ')
    stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
        if (args[1] == 'upgrade') {
            if (Number(args[2])) {
                let totalup = 0
                for (let i = 1; i <= Number(args[2]); i++) {
                    if (user.rp >= 250000) {
                        user.decrement('rp',{ by: 300000 }).then((usr) => {
                            totalup = Number(totalup) + 100000
                            usr.increment('banklimit',{ by: 100000 }).catch((err) => { console.log(err); })
                        }).catch((err) => { console.log(err); })
                    } else {
                        msg.reply('You dont have enough R-Points to upgrade. (300k required)')
                        break
                    }
                }
                msg.reply(`Increased bank limit to ${Number(user.banklimit)+totalup}`)
            } else {
                if (user.rp >= 250000) {
                    user.decrement('rp',{ by: 300000 }).then((usr) => {
                        usr.increment('banklimit',{ by: 100000 }).catch((err) => { console.log(err); })
                    }).catch((err) => { console.log(err); })
                    msg.reply(`Increased bank limit to ${Number(user.banklimit)+100000}`)
                } else {
                    msg.reply('You dont have enough R-Points to upgrade. (300k required)')
                }
            }
        } else if (args[1] == 'deposit' && (Number(user.bankbalance) + (Math.round(Number(args[2])) || 0)) <= user.banklimit) {
            if (user.rp >= (Math.round(Number(args[2])) || 0)) {
                user.decrement('rp',{ by: (Math.round(Number(args[2])) || 0) }).then((usr) => {
                    usr.increment('bankbalance', { by: (Math.round(Number(args[2])) || 0) }).catch((err) => { console.log(err); })
                }).catch((err) => { console.log(err); })
                msg.reply(`Deposited ${(Math.round(Number(args[2])) || 0)} R-Points into bank.`)
            } else {
                msg.reply('Not enough R-Points, or invalid number. (brokie either way)')
            }
        } else if (args[1] == 'withdraw' ) {
            if (user.bankbalance >= (Math.round(Number(args[2])) || 0)) {
                user.decrement('bankbalance',{ by: (Math.round(Number(args[2])) || 0) }).then((usr) => {
                    usr.increment('rp', { by: (Math.round(Number(args[2])) || 0) }).catch((err) => { console.log(err); })
                }).catch((err) => { console.log(err); })
                msg.reply(`Withdrew ${(Math.round(Number(args[2])) || 0)} R-Points from bank.`)
            } else {
                msg.reply('Not enough R-Points in bank, or invalid number. (brokie either way)')
            }
        }
    })
}

module.exports = {
    name: 'bank',
    execute: execute
}