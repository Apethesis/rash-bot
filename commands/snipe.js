function execute(msg, stats) {
    if (msg.author.id != stats.prevdel.author) {
        msg.reply('```\n'+`${stats.prevdel.content}\n`+'``` - <@'+`${stats.prevdel.author}`+'>');
    }
}
module.exports = {
    name: 'snipe',
    execute: execute
}