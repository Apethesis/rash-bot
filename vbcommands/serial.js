const {  EmbedBuilder } = require('discord.js');
function execute(msg, stats, shortform) {
    let args
    if (!shortform) {
        args = msg.content.split(' ')
    } else {
        args = ('>serial get '+msg.content).split(' ')
    }
    if (args[1] == 'get' && args[1] != 'set') {
        if (args[2].substring(0,1) == '#') {
            const ser = stats.baseSerial.findOne({ where: { code: args[2] }}).then((ser) => {
                if (ser) {
                    msg.reply({ embeds: [
                        new EmbedBuilder().setColor(0xFFFFFF).setTitle(args[2]).setDescription(`This serial code belongs to the: ${ser.wep}`)
                    ]})
                } else {
		    if (!shortform) {
                    	msg.reply('Serial code not found in registry.')
		    }
                }
            }).catch(() => {})
        } else {
            const ser = stats.baseSerial.findOne({ where: { code: '#'+args[2] }}).then((ser) => {
                if (ser) {
                    msg.reply({ embeds: [
                        new EmbedBuilder().setColor(0xFFFFFF).setTitle('#'+args[2]).setDescription(`This serial code belongs to the: ${ser.wep}`)
                    ]})
                } else {
                    msg.reply('Serial code not found in registry.')
                }
            }).catch(() => {})
        }
    } else if ( args[1] != 'set' && (Number(args[1]) != NaN || args[1].substring(0,1) == '#') ) {
        if (args[1].substring(0,1) == '#') {
            const ser = stats.baseSerial.findOne({ where: { code: args[1] }}).then((ser) => {
                if (ser) {
                    msg.reply({ embeds: [
                        new EmbedBuilder().setColor(0xFFFFFF).setTitle(args[1]).setDescription(`This serial code belongs to the: ${ser.wep}`)
                    ]})
                } else {
                    msg.reply('Serial code not found in registry.')
                }
            }).catch(() => {})
        } else {
            const ser = stats.baseSerial.findOne({ where: { code: '#'+args[1] }}).then((ser) => {
                if (ser) {
                    msg.reply({ embeds: [
                        new EmbedBuilder().setColor(0xFFFFFF).setTitle('#'+args[1]).setDescription(`This serial code belongs to the: ${ser.wep}`)
                    ]})
                } else {
                    msg.reply('Serial code not found in registry.')
                }
            }).catch(() => {})
        }
    } else if (args[1] == 'set' && msg.author.id == '1168868176189198418') {
        const tstart = args[0].length + args[1].length + args[2].length + 3
        const tcontent = msg.content.substring(tstart)
        if (args[2].substring(0,1) == '#') {
            const tag = stats.baseSerial.create({
                code: args[2],
                wep: tcontent
            }).then(() => {
                msg.reply('Serial code added to registry.')
            }).catch((err) => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    msg.reply('That serial code is already in the registry.');
                }
            })
        } else {
            const tag = stats.baseSerial.create({
                code: '#'+args[2],
                wep: tcontent
            }).then(() => {
                msg.reply('Serial code added to registry.')
            }).catch((err) => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    msg.reply('That serial code is already in the registry.');
                }
            })
        }
    }
}

module.exports = {
    name: 'serial',
    execute: execute
}
