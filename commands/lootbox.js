function execute(msg, stats) {
    const args = msg.content.split(' ')
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
        'Solstice ': [1,100000,2100],
    }
    stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
        if (user) {
            if (args[1] == 'basic') {
                if (user.rp >= 500) {
                    user.decrement('rp', {by:500}).then((usr) => {

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