function execute(msg, stats) {
    const args = msg.content.split(' ')
    const tstart = args[0].length + args[1].length + 2
    const tcontent = msg.content.substring(tstart)
    const commoner = [
        'Normal Chatter, ',
        'Beginner Martial Artist, ',
        'Noob ',
        'Destroyer Of Bees, ',
        'Fake Sigma ',
        'Ukulele Apology User, ',
        'Trash Incarnated, ',
        'Dead Corpse ',
        'Lost Like Zoro, ',
        'Nokia User, ',
        'Cringe ',
        'Hero ',
        'Extreme ',
        'The Fool, '
    ]
    const rare = {
        'Powerful Fighter, ': [1,8,1],
        'Speed Demon ': [1,8,2],
        'Hero Hunter, ': [1,8,3],
        'Wielder Of The Blade, ': [1,8,4],
        'Left Right Goodnight, ': [1,8,5],
        'Money Spender ': [1,8,6],
        'Sparking ': [1,8,7],
        'Destroyer Of Realms ': [1,76,8],
        'Collapsing Star Warrior, ': [1,76,9],
        'Yours Truly, ': [1,76,10],
        'Hope Of The Future, ': [1,86,11],
        'Warrior Of Peace, ': [1,86,12],
        'Final Form Nega ': [1,96,13],
        'Pride Of Our Warrior Race ': [1,96,14],
        'The Man Stuck Inside The Suit ': [1,96,15],
        'Apprentice Of A God, ': [1,100,16],
        'Grade 1 Sorcerer, ': [1,100,17],
        'Heavenly Restricted ': [1,101,18],
        'The Legendary Saiyan, ': [1,101,19],
        'Near The Strongest, ': [1,101,20],
        'Determined ': [1,126,21],
        'Solstice ': [1,100000,22],
    }
    function roll(min,max) {
        return stats.clamp((stats.getRandomInt(min,max)*stats.sessionstats.multi),min,max)
    }
    stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
        if (user) {
            if (args[1] == 'basic') {
                if (user.rp >= 500) {
                    user.decrement('rp', {by:500}).then((usr) => {
                        if (roll(1,5) == 1) {
                            const gain = commoner[roll(0,commoner.length-1)]
                            const titles = JSON.parse(usr.titles)
                            if (Object.keys(titles).includes(gain)) {
                                msg.reply(`You found: `+'``'+gain+'`` (Common)'+`\nToo bad you already have this title...`)
                                usr.increment('rp', { by: 150 })
                            } else {
                                titles[Object.keys(titles).length+1] = gain
                                msg.reply(`You found: `+'``'+gain+'`` (Common)')
                                usr.titles = JSON.stringify(titles)
                                usr.save()
                            }
                        } else if (roll(1,50) == 50) {
                            let gain
                            const titles = JSON.parse(usr.titles)
                            for (i in rare) {
                                if (roll(rare[i][0],rare[i][1]) == rare[i][2]) {
                                    gain = i
                                    break
                                }
                            }
                            if (Object.keys(titles).includes(gain)) {
                                msg.reply(`You found: `+'``'+gain+'`` (Rare)'+`\nToo bad you already have this title...`)
                                usr.increment('rp', { by: 300 })
                            } else {
                                titles[Object.keys(titles).length+1] = gain
                                msg.reply(`You found: `+'``'+gain+'`` (Rare)')
                                usr.titles = JSON.stringify(titles)
                                usr.save()
                            }
                        } else {
                            msg.reply(`You found: Nothing! (boowomp)`)
                        }
                    })
                }
            } else if (args[1] == 'inv' || args[1] == 'inventory') {
                let stri = 'Inventory:\n'
                const titles = JSON.parse(user.titles)
                for (i in titles) {
                    stri = stri+i+'. '+titles[i]+'\n'
                }
                msg.reply(stri)
            } else if (args[1] == 'equip') {
                const titles = Object.keys(JSON.parse(user.titles))
                console.log(tcontent+' ')
                console.log(titles)
                if (titles.includes(tcontent+' ')) {
                    if ((tcontent+' '+msg.author.globalName).length > 32) {
                        msg.member.setNickname((tcontent+' '+msg.author.globalName).substring(0,32))
                    } else {
                        msg.member.setNickname(tcontent+' '+msg.author.globalName)
                    }
                } else {
                    msg.reply('You dont own that title.')
                }
            } else if (args[1] == 'sell') {
                const titles = Object.keys(JSON.parse(user.titles))
                const otitles = JSON.parse(user.titles)
                if (titles.includes(tcontent+' ')) {
                    otitles[titles.indexOf(tcontent+' ')] = null
                    user.titles = JSON.stringify(otitles)
                    msg.reply(`Sold for ${rare[tcontent+' '][3]} R-Points.`)
                    user.save().then(() => {
                        user.increment('rp', {by: rare[tcontent+' '][3]})
                    })
                }
            }
        }
    }).catch(() => {})
}
module.exports = {
    name: 'lootbox',
    execute: execute
}