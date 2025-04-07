function execute(msg, stats) {
    msg.reply('```json\n'+`${JSON.stringify(stats.truetags,null,3)}`+'\n```')
}
module.exports = {
    name: 'tags',
    execute: execute
}