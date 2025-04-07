function execute(msg, stats) {
    if (msg.author.id == '1168868176189198418' || stats.authroles[msg.member.roles.highest.id]) {
        const quant = Math.ceil(((msg.content.substring(7)*1)/100))
        const absquant = (msg.content.substring(7)*1)+1
        for (let i = 1; i <= quant; i++) {
            msg.channel.bulkDelete(stats.clamp(absquant-(100*i),0,100)).then(() => {
                console.log(i)
                console.log(quant)
                if (i == quant) {
                    msg.channel.send('https://tenor.com/view/gojo-gojo-satoru-hollow-purple-sukuna-mahoraga-gif-13503454303453550028')
                }
	        }).catch((err) => {
                console.log(err)
            });
        }
    }
}
module.exports = {
    name: 'purge',
    execute: execute
}
