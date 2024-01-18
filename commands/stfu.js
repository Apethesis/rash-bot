function execute(msg, stats) {
    const votingfor = msg.content.substring(6)
    stats.stfuvotes.voted[votingfor] = stats.stfuvotes.voted[votingfor] || {}
    stats.stfuvotes.voting[votingfor] = stats.stfuvotes.voting[votingfor] || 0
    if ( !stats.stfuvotes.voted[votingfor][msg.author.id] ) {
        stats.stfuvotes.voted[votingfor][msg.author.id] = true
        stats.stfuvotes.voting[votingfor] += 1
        setTimeout(function() {
            stats.stfuvotes.voting[votingfor] = 0
            stats.stfuvotes.voted[votingfor] = undefined
        },5*60*1000)
        msg.reply(`Added vote, current number of votes for <@${votingfor}> is ${stats.stfuvotes.voting[votingfor]}.`)
    } else {
        msg.reply(`You already voted for this person to shut the fuck up.`)
    }
    if ( stats.stfuvotes.voting[votingfor] >= 5 ) {
        msg.guild.members.addRole({user: `${votingfor}`, role: '1183485053787983872', reason: 'User was forced to shut the fuck up'})
        setTimeout(() => {
            msg.guild.members.removeRole({user: `${votingfor}`, role: '1183485053787983872'})
        },10*60*1000)
        stats.stfuvotes.voting[votingfor] = 0
        stats.stfuvotes.voted[votingfor] = undefined
        msg.channel.send(`https://tenor.com/view/gojo-domain-expansion-gif-19197982`)
    }
}
module.exports = {
    name: 'stfu',
    execute: execute
}