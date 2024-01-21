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
        'Powerful Fighter, ': [1,8,1,12500], // these are rare nigga...
        'Speed Demon ': [1,8,2,12500],
        'Hero Hunter, ': [1,8,3,12500],
        'Wielder Of The Blade, ': [1,8,4,12500],
        'Left Right Goodnight, ': [1,8,5,12500],
        'Money Spender ': [1,8,6,12500],
        'Sparking ': [1,8,7,12500],
        'Destroyer Of Realms ': [1,76,8,125000],
        'Collapsing Star Warrior, ': [1,76,9,125000],
        'Yours Truly, ': [1,76,10,125000],
        'Hope Of The Future, ': [1,86,11,150000],
        'Warrior Of Peace, ': [1,86,12,150000],
        'Final Form Nega ': [1,96,13,175000],
        'Pride Of Our Warrior Race ': [1,96,14,175000],
        'The Man Stuck Inside The Suit ': [1,96,15,175000],
        'Apprentice Of A God, ': [1,100,16,200000],
        'Grade 1 Sorcerer, ': [1,100,17,200000],
        'Heavenly Restricted ': [1,101,18,225000],
        'The Legendary Saiyan, ': [1,101,19,225000],
        'Near The Strongest, ': [1,101,20,225000],
        'Determined ': [1,126,21,275000],
        'Solstice ': [1,10000000,22,111110101115104111116],
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
                            let has
                            for (i in titles) {
                                if (titles[i] == gain) {
                                    has = true
                                    break
                                } 
                            }
                            if (has) {
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
                            let has
                            for (i in titles) {
                                if (titles[i] == gain) {
                                    has = true
                                    break
                                } 
                            }
                            if (gain) {
                                if (has) {
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
                const titles = JSON.parse(user.titles)
                console.log(tcontent+' ')
                console.log(titles)
                let found
                for (i in titles) {
                    if (titles[i] == tcontent+' ') {
                        found = true
                        break
                    } 
                }
                if (found) {
                    if ((tcontent+' '+msg.author.globalName).length > 32) {
                        msg.member.setNickname((tcontent+' '+msg.author.globalName).substring(0,32))
                    } else {
                        msg.member.setNickname(tcontent+' '+msg.author.globalName)
                    }
                } else {
                    msg.reply('You dont own that title.')
                }
            } else if (args[1] == 'sell') {
                const titles = JSON.parse(user.titles)
                const otitles = JSON.parse(user.titles)
                let found
                for (i in titles) {
                    if (titles[i] == tcontent+' ') {
                        found = true
                        break
                    } 
                }
                if (found) {
                    otitles[titles.indexOf(tcontent+' ')] = null
                    user.titles = JSON.stringify(otitles)
                    msg.reply(`Sold for ${rare[tcontent+' '][3]} R-Points.`)
                    user.save().then(() => {
                        user.increment('rp', {by: rare[tcontent+' '][3]})
                    })
                }
            } else if (args[1] == 'unequip') {
                msg.member.setNickname(null)
            }
        }
    }).catch(() => {})
}
module.exports = {
    name: 'lootbox',
    execute: execute
}