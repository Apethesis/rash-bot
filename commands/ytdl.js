const { spawn } = require('child_process');
const fs = require('node:fs');
function execute(msg, stats) {
    const ticktock = msg.content.substring(6)
    const authlist = {
        '1192565756899102830': true,
        '1193707486931324938': true,
        '1193709967228805222': true,
    }
    if (msg.author.id == '1168868176189198418' || authlist[msg.member.roles.highest.id]) {
        //msg.removeAttachments()
        msg.suppressEmbeds(true)
        const ytdlp = spawn('yt-dlp', ['-S','res:480',ticktock,'-o','./ytdltemp.webm'])
        ytdlp.on('error', (err) => {
            console.log(err)
        });
        ytdlp.on('close', code => {
            msg.reply({ files: [`./ytdltemp.webm`] }).then(() => {
                fs.rm('./ytdltemp.webm', (err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err)
                fs.rm('./ytdltemp.webm', () => {})
            })
        })
    }
}
module.exports = {
    name: 'ytdl',
    execute: execute
}