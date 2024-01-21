function execute(msg, stats) {
    const args = msg.content.split(' ')
    stats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
        if (user) {
            
        }
    }).catch(() => {})
}
module.exports = {
    name: 'lootbox',
    execute: execute
}