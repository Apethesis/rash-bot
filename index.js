const { Partials, Client, Events, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const fetch = require('node-fetch');
const { spawn } = require('child_process');
const {Sequelize, DataTypes, Op} = require('sequelize');
const veilbot = false
const testingmode = false
const { randomInt } = require('crypto');
const rshdb = new Sequelize('rshdb','postgres','root', {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
})
const vdb = new Sequelize('vdb','postgres','root', {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
})
const client = new Client({
	intents: [GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User],
});
let vbclient 
if (veilbot) {
    vbclient = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
        partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    })
}
const commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('name' in command && 'execute' in command) {
		commands.set('>'+command.name, command); 
	} else {
    	console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
let vbcommands
let vbcommandsPath
let vbcommandFiles
if (veilbot) {
    vbcommands = new Collection();
    vbcommandsPath = path.join(__dirname, 'vbcommands');
    vbcommandFiles = fs.readdirSync(vbcommandsPath).filter(file => file.endsWith('.js'));
    for (const file of vbcommandFiles) {
        const filePath = path.join(vbcommandsPath, file);
        const command = require(filePath);
        if ('name' in command && 'execute' in command) {
            vbcommands.set('>'+command.name, command); 
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
const intstats = {
    env: process.env,
    body: {
        userIDs: [
            process.env.MINO
        ]
    },
    stfuvotes: {
        voted: {},
        voting: {}
    },
    blacklisted: {
        '642374253076807701': true, //zenin, hatred
        '1087935025649033266': true, // deletoblue, possible alt
        '632857574664044544': true, // nother possible alt
        '771054849415577640': true, // the final
        '1149091268618620969': true, // >:3
    },
    truetags: {
        'twogenders': 'twogender.mov',
        'twogender': 'twogender.mov',
        'ticktock': 'bufffortress2.webm',
        'buff': 'bufffortress2.webm',
        'jogo': 'jonething.mp4',
        'fuck': 'sad_mickey_moose.mp4',
        'kys': 'kys.mp4',
        'kys2': 'kys2.mp4',
        'broly': 'cheeks.mov',
        'mino': 'mino.mp4',
        'omega': 'omega.mp4',
        'me': 'me.mp4',
        'hydra': 'hydra.mp4',
        'gabs': 'gabs.mp4',
        'vano': 'vano.mov',
        'kys2.5': 'boom.webm',
        'yur': 'hydra.mp4',
        'compec': 'compec.mp4',
        'console': 'compec.mp4',
        'sexmana': 'sexmana.mp4',
        'egg': 'sexmana.mp4',
        'malik': 'sexmana.mp4',
        'guardian': 'guardian.mp4',
        'konami': 'konami.jpg',
        'konaku': 'konami.jpg',
        'yur2': 'yur2.mp4',
        'lar': 'lar.mov',
        'grr': 'lar.mov',
        'kijana': 'kijana.webm',
        'kai': 'kijana.webm',
        'compecvsgab': 'compecvsgab.webm',
        'mevsgab': 'compecvsgab.webm',
        'godd': 'godd.webm',
	    'thehonoredone': 'thehonoredone.webm',
	    'gojo': 'thehonoredone.webm',
        'lorenzo': 'lorenzo.webm',
        'bootylicker': 'bootykisser.webm',
        'bootykisser': 'bootykisser.webm',
	    'inkingmistake': 'inkingmistake.webm',
        'imyou': 'imyou.webm',
        'stoen': 'stoen.mp4',
        'bigstoen': 'stoen.mp4',
        'futuretrunksguy': 'stoen.mp4',
        'ragecombo': 'RageCombo.mp4',
        'raaah': 'RageCombo.mp4',
    },
    secrettags: {
        'fluxison': 'fluxison.webm',
        'thistimeisdifferent': 'timedifferent.webm',
        'truecompec': 'truepec.mp4',
        'trueconsole': 'truepec.mp4',
        'gamingfan': 'truepec.mp4',
	    'delirious': 'gojo.webm',
	    'gojo2': 'gojo.webm',
        'onlittlecatfeet': 'olcf.ogg',
        'onlittlecatfeet2': 'olcfr.webm',
        'myburdenislight': 'mbil.webm',
        'gogeta4': 'GogetaSS4.mp4',
        'vegito': 'VegitoSSB.mp4',
        'gogetame': 'GogetaBlueME.mp4',
        'gogetaffk': 'GogetaBlueFFK.mp4',
    },
    authroles: {
        '1161076090677243994': true,
        '1192565756899102830': true,
    },
    authchannels: {
        '1182461134549291038': true,
    },
    relayguilds: {
        '1185779092340088982': '1080628670227546132'
    },
    basetag: rshdb.define("baseTag", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        content: Sequelize.TEXT,
        creator: Sequelize.STRING,
    }),
    argtosec: function(arg) {
        const mod = arg.substring(arg.length-1); console.log(mod);
        const num = arg.substring(0,arg.length-mod.length); console.log(num);
        if (mod == 's') {
            return num
        } else if (mod == 'm') {
            return num*60
        } else if (mod == 'h') {
            return (num*60)*60
        } else if (mod == 'd') {
            return ((num*60)*60)*24
        }
        return num
    },
    baseUser: rshdb.define('baseUser', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        exp: DataTypes.BIGINT,
        lv: {
            type: DataTypes.BIGINT,
            defaultValue: 1,
        },
        cmsg: DataTypes.SMALLINT,
        rp: {
            type: DataTypes.BIGINT,
            defaultValue: 20,
        },
    }),
    baseSerial: vdb.define('baseSerial', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        wep: DataTypes.STRING
    }),
    getRandomInt: randomInt,
    curcd: {},
    rshdb: rshdb,
    chancetbl: {
        'solstice': [1,100000,85000],
    },
    commonroles: {},
    sessionstats: {
        mod: 0,
        multi: 1,
    },
    clamp: function(n,m,mx) {
       return Math.min(Math.max(n, m), mx)
    },
}
function relatisend(msg, tochannel) {
    if (msg.embeds.length > 0) {
        tochannel.send({
            content: msg.member.displayName+': '+msg.content,
            embeds: msg.embeds
        })
    } else if (msg.attachments.length > 0) {
        tochannel.send({
            content: msg.member.displayName+': '+msg.content,
            files: msg.attachments,
        })
    } else if ((msg.attachments.length > 0) && (msg.embeds.length > 0)) {
        tochannel.send({
            content: msg.member.displayName+': '+msg.content,
            files: msg.attachments,
            embeds: msg.embeds,
        })
    } else {
        tochannel.send({
            content: msg.member.displayName+': '+msg.content
        })
    }
} // .catch(() => {})
client.on(Events.MessageCreate, msg => {
    if (msg.channel.id == '1196363461354070036' && !(msg.content == "https://tenor.com/view/toji-toji-fushiguro-jujutsu-kaisen-jujutsu-kaisen-season-2-jjk-gif-14137776531255548484" || msg.content == "toji fushigiro")) {
       msg.delete().catch((err) => { console.log(err) })
    }
    if (true) {
        intstats.baseUser.findOne({ where: { id: msg.author.id }}).then((user) => {
            if (user) {
                user.increment('cmsg').then((usr) => {
                    console.log(`${msg.member.displayName}: ${usr.cmsg}`)
                    if (usr.cmsg >= 15) {
                        usr.cmsg == 0
                        usr.decrement('cmsg', { by: usr.cmsg }).then(() => {
                            usr.increment('exp',{ by: intstats.getRandomInt(25, 128) }).then((useer) => {
                                if (useer.exp >= ((500 * (1+(useer.lv * 0.1)))*useer.lv)) {
                                    useer.increment('lv').then((us) => {
                                        if (us.lv == 20) {
                                            msg.guild.members.addRole({user: msg.author.id, role: '1193707486931324938'}).then(() => { msg.reply(`${msg.member.displayName} has leveled up to blue.`) }).catch((err) => { console.log(err); })
                                        } else if (us.lv == 50) {
                                            msg.guild.members.addRole({user: msg.author.id, role: '1193709708746424343'}).then(() => { msg.reply(`${msg.member.displayName} has leveled up to red.`) }).catch((err) => { console.log(err); })
                                        } else if (us.lv == 100) {
                                            msg.guild.members.addRole({user: msg.author.id, role: '1193709967228805222'}).then(() => { msg.reply(`${msg.member.displayName} has leveled up to purple.`) }).catch((err) => { console.log(err); })
                                        }
                                        us.increment('rp',{ by: intstats.getRandomInt(20,500) })
                                    }).catch((err) => { console.log(err) })
                                }
                            }).catch((err) => { console.log(err) })
                        }).catch((err) => { console.log(err) })
                    }
                }).catch((err) => { console.log(err) })
                user.save().catch((err) => { console.log(err) })
            } else {
                intstats.baseUser.create({
                    id: msg.author.id,
                    exp: 1,
                    lv: 1,
                    rp: 20,
                    cmsg: 0,
                })
            }
        })
    }
    if (msg.content.toLowerCase().includes("furryku") && (msg.content.toLowerCase().includes("bad") || msg.content.toLowerCase().includes("hate") || msg.content.toLowerCase().includes("mid") || msg.content.toLowerCase().includes("ass") || msg.content.toLowerCase().includes("trash")) && msg.channelId == '1188252794793238548') {
        msg.member.timeout(intstats.argtosec("5m")*1000)
    }
    if (msg.content == "https://tenor.com/view/seal-spin-spinning-spinning-seal-animal-spin-gif-17879679") {
        msg.delete()
    }
    for (guild in intstats.relayguilds) {
        if ((msg.guild.id == intstats.relayguilds[guild]) && (msg.author.id != '1177722822420877353')) {
            if (client.guilds.fetch('1185654470957338675').then((gld) => gld.channels.cache.find((chan) => (chan.name == msg.channel.name) && (chan.parentId == guild))).catch(() => {})) {
                client.guilds.fetch('1185654470957338675').then((gld) => relatisend(msg, gld.channels.cache.find((chan) => (chan.name == msg.channel.name) && (chan.parentId == guild)))).catch(() => {})
                break
            } else {
                client.guilds.fetch('1185654470957338675').then((gld) => relatisend(msg, gld.channels.fetch('1185657962254041128').then((channel) => relatisend(msg, channel)).catch(() => {}))).catch(() => {})
                break
            }
        } else {
            if (msg.member.id != '1177722822420877353') {
                if (client.guilds.fetch(intstats.relayguilds[guild]).then((gld) => gld.channels.cache.find((chan) => (chan.name == msg.channel.name) && (msg.channel.parentId == guild))).catch(() => {})) {
                    client.guilds.fetch(intstats.relayguilds[guild]).then((gld) => relatisend(msg, gld.channels.cache.find((chan) => chan.name == msg.channel.name))).catch(() => {})
                    break
                }
            }
        }
    }
    let command
    if (msg.author.id != '1177722822420877353')  {
        if (msg.attachments.first() && (msg.attachments.first().contentType == 'video/x-ms-wmv')) {
            fetch(msg.attachments.first().url).then((res) => {
                res.body.pipe(fs.createWriteStream('./temp.wmv'))
                res.body.on("end", () => {
                    const fmpg = spawn('ffmpeg', ['-i','./temp.wmv','./tempout.mp4'])
                    fmpg.on('error', () => {});
                    fmpg.on('close', code => {
                        msg.reply({ files: [`./tempout.mp4`] }).then(() => {
                            fs.rm('./temp.wmv', (err) => {})
                            fs.rm('./tempout.mp4', (err) => {})
                        }).catch(() => {})
                    })
                })
            }).catch(() => {})
        }
        if (msg.content.split(" ")[0].substring(0,7) == '>action') {
            command = commands.get('>action');
        } else if (msg.content.split(" ")[0].substring(0,4) == '>get') {
            command = commands.get('>get');
        } else if (msg.content.substring(0,1) == "\\") {
            command = commands.get('>tag')
        } else {
            command = commands.get(msg.content.split(" ")[0]);
        }
    }
    if (!command) {
		return;
	}
    try {
		command.execute(msg, intstats);
	} catch (error) {
		console.error(error);
	}
})  
if (veilbot) {
    vbclient.on(Events.MessageCreate, msg => {
        let command
        let shortform = false
        if (msg.content.substring(0,1) == "#" && intstats.baseSerial.findOne({where: { code: msg.content }})) {
            command = vbcommands.get('>serial')
            shortform = true
        } else {
            command = vbcommands.get(msg.content.split(" ")[0]);
        }
        if (!command) {
            return;
        }
        try {
            if (shortform) {
                command.execute(msg, intstats, shortform)
            } else {
                command.execute(msg, intstats);
            }
        } catch (error) {
            console.error(error);
        }
    })
}
client.on(Events.MessageDelete, msg => {
    if (msg.author.id != '1177722822420877353') {
        intstats.prevdel = {
            author: msg.author.id,
            content: msg.content
        }
    }
    const properstr = msg.content.replace(/@everyone|@here/gi, '');
    if (!(msg.attachments.length > 0)) {
        client.channels.fetch('1188243316257587281').then((channel) => {
            channel.send({
                content:`Deleted message by ${msg.author.displayName}\nMessage: "${properstr}"`
            })
        }).catch(() => {})
    } else {
        if (msg.author.id == '1177722822420877353') {
            client.channels.fetch('1188243316257587281').then((channel) => {
                channel.send({
                    content:`Deleted message by ${msg.author.displayName}\nMessage: "${properstr}"\nAttachments:`
                })
            }).catch(() => {})
        } else {
            let attached = []
            let curat = 0
            msg.attachments.forEach((v,k) => {
                attached[curat] = {
                    attachment: v.url,
                    name: v.name
                }
                curat = curat + 1
            })
            client.channels.fetch('1188243316257587281').then((channel) => {
                channel.send({
                    content:`Deleted message by ${msg.author.displayName}\nMessage: "${properstr}"\nAttachments:`,
                    files: attached
                })
            }).catch(() => {})
        }
    }
})
client.on(Events.MessageUpdate, msg => {
    if (msg.author.id == '1177722822420877353') {
        client.channels.fetch('1188243316257587281').then((channel) => {
            channel.send({
                content:`Edited message by ${msg.author.displayName}\nMessage: "${properstr}"`
            })
        }).catch(() => {})
    }
})
client.on(Events.GuildMemberAdd, m => {
    if (intstats.blacklisted[m.id]) {
        console.log(m.displayName+' tried to join, no thank you!')
        m.kick("No blacklisted members, sowwy! :3")
    }
})
client.once(Events.ClientReady, c => {
    intstats.basetag.sync({ alter: true });
    intstats.baseUser.sync({ alter: true });
    fs.rm('./ytdltemp.webm', () => {}) 
	console.log(`Ready! Logged in as ${c.user.tag}`);
    setInterval(() => {
        const response = fetch('https://presence.roblox.com/v1/presence/users', {
            method: 'POST',
            body: JSON.stringify(intstats.body),
            headers: {'Content-Type': 'application/json'}
        }).then(x => x.json().then(data => ({
            data: data,
            status: x.status
        }))).then(res => intstats.resp = res)
        if (intstats.resp != undefined) {
            intstats.oldstat = intstats.status
            intstats.status = {
                presenceType: intstats.resp.data.userPresences[0].userPresenceType,
                location: intstats.resp.data.userPresences[0].lastLocation,
                place: intstats.resp.data.userPresences[0].gameId
            }
            console.log(`doing, ${intstats.status.location}`)
            if (intstats.oldstat != undefined && intstats.status.presenceType != intstats.oldstat.presenceType) {
                if (intstats.status.location == "Website" && intstats.status.presenceType == 1) {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Mino is wasting away the little time he has left instead of getting his ass in studio.')
                        .setDescription('On the website (its so minover........).')
                        .setFooter({ text: `${intstats.status.presenceType}, ${intstats.status.location || "none"}` })
                    c.guilds.cache.get(`${process.env.GLID}`).channels.cache.get(`${process.env.CHID}`).send({ embeds: [embed] })
                } else if (intstats.status.location.includes('Studio') || intstats.status.presenceType == 3) {
                    const embed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle('Mino is in studio, probably changing a few values and then closing it before actually working on shallot.')
                        .setDescription('In studio, this is good news.')
                        .setFooter({ text: `${intstats.status.presenceType}, ${intstats.status.location || "none"}` })
                    c.guilds.cache.get(`${process.env.GLID}`).channels.cache.get(`${process.env.CHID}`).send({ embeds: [embed] })
                } else if (intstats.status.presenceType == 2 && !intstats.status.location.includes('Studio') && intstats.status.location != "Website") {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Mino is being a lazy fucking bitch again and playing roblox.')
                        .setDescription('Dissapointing the community (playing a roblox game).')
                        .setFooter({ text: `${intstats.status.presenceType}, ${intstats.status.location || "none"}` })
                    c.guilds.cache.get(`${process.env.GLID}`).channels.cache.get(`${process.env.CHID}`).send({ embeds: [embed] })
                } else if (intstats.status.presenceType == 0) {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Mino is wasting away the little time he has and sleeping (or doing something irl).')
                        .setDescription('Offline.')
                        .setFooter({ text: `${intstats.status.presenceType}, ${intstats.status.location || "none"}` })
                    c.guilds.cache.get(`${process.env.GLID}`).channels.cache.get(`${process.env.CHID}`).send({ embeds: [embed] })
                }
            }
        }
    }, 600000)
});
if (veilbot) {
    vbclient.once(Events.ClientReady, c => {
        intstats.baseSerial.sync();
        console.log(`Ready! Logged in as ${c.user.tag}`);
    })
}
client.on(Events.MessageReactionAdd, async (msgr, user) => {
    if (msgr.partial) {
		try {
			await msgr.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
    if (msgr.message.channel.id == '1194055629346705429') {
        if (msgr.emoji.id == '1192977053767700661') { // gokustare
            msgr.emoji.guild.members.addRole({user: user.id, role: '1195425749692330034'}).catch((err) => { console.log(err); })
        } else if (msgr.emoji.id == '1191449291676467220') { // gojo
            msgr.emoji.guild.members.addRole({user: user.id, role: '1196310700105138207'}).catch((err) => { console.log(err); })
        } else if (msgr.emoji.id == '1191710190643462144') { // oofy
            msgr.emoji.guild.members.addRole({user: user.id, role: '1197366106369818754'}).catch((err) => { console.log(err); })
        }
    }
})
client.on(Events.MessageReactionRemove, async (msgr, user) => {
    if (msgr.partial) {
		try {
			await msgr.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
    if (msgr.message.channel.id == '1194055629346705429') {
        if (msgr.emoji.id == '1192977053767700661') { // gokustare
            msgr.emoji.guild.members.removeRole({user: user.id, role: '1195425749692330034'}).catch((err) => { console.log(err); })
        } else if (msgr.emoji.id == '1191449291676467220') { // gojo
            msgr.emoji.guild.members.removeRole({user: user.id, role: '1196310700105138207'}).catch((err) => { console.log(err); })
        } else if (msgr.emoji.id == '1191710190643462144') { // oofy
            msgr.emoji.guild.members.removeRole({user: user.id, role: '1197366106369818754'}).catch((err) => { console.log(err); })
        }
    }
})
if (testingmode) { client.login(process.env.TTOK); } else { client.login(process.env.TOK); }
if (veilbot) { vbclient.login(process.env.VTOK); }