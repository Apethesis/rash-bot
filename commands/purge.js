function execute(msg, stats) {
    if (msg.author.id == '1168868176189198418' || msg.member.roles.highest.id == '1192565756899102830') {
        msg.channel.bulkDelete((msg.content.substring(7)*1)+1).then(() => {
	    msg.channel.send('https://tenor.com/view/gojo-gojo-satoru-hollow-purple-sukuna-mahoraga-gif-13503454303453550028')
	}).catch((err) => {
            console.log(err)
        });
    }
}
module.exports = {
    name: 'purge',
    execute: execute
}
