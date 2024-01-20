function execute(msg, stats) {
    const secure = {
        '1168868176189198418': true,
        '447131790155448380': true,
        '544714265723142144': true,
        '1140029502005719071': true,
        '1055982077293629530': true,
        '928018293657313371': true,
    }
    const prevtx = msg.content.substring(7).split("<");
    const num = prevtx[1].lastIndexOf(">");
    const action = prevtx[1].substring(num,0).toLowerCase()
    const args = msg.content.split(' ')
    const authorized = {
        '1198041664804106250': true,
        '1198046098703528106': true,
        '1192565756899102830': true,
        '1196898349798924439': true,
        '1196755851613044777': true,
    }
    if (msg.author.id == '1168868176189198418' || authorized[msg.member.roles.highest.id]) {
        switch (action) {
            case 'kick':
                if (secure[args[1].substring(2,args[1].length-1)]) {
                    msg.reply({ files: ['./tags/Reversal.webm'] }).then(() => {
                        setTimeout(() => {
                            msg.guild.members.cache.get(msg.author.id).kick().catch(() => {})
                        },13*1000)
                    })
                } else {
                    msg.guild.members.cache.get(args[1].substring(2,args[1].length-1)).kick().catch(() => {
                        msg.channel.send('Failed to kick, either the specified user is too high rank or doesnt exist.')
                    })
                }
                break
            case 'ban':
                if (secure[args[1].substring(2,args[1].length-1)]) {
                    msg.reply({ files: ['./tags/Reversal.webm'] }).then(() => {
                        setTimeout(() => {
                            msg.guild.members.ban(msg.author.id).catch(() => {})
                        },13*1000)
                    })
                } else {
                    msg.guild.members.ban(args[1].substring(2,args[1].length-1)).then(() => {
                        if (msg.author.id == '556136950114025523') {
                            msg.channel.send('https://tenor.com/view/gogeta-dbz-dragon-ball-gogeta-hollow-purple-hollow-purple-gif-3984268001698118622')
                        } else {
                            msg.channel.send('https://tenor.com/view/gojo-satoru-gojo-hollow-purple-jujutsu-kaisen-blue-gif-16843591044568531318')
                        }
                    }).catch(() => {
                        msg.channel.send('Failed to ban, either the specified user is too high rank or doesnt exist.')
                    })
                }
                break
            case 'timeout':
                if (secure[args[1].substring(2,args[1].length-1)]) {
                    msg.reply({ files: ['./tags/Reversal.webm'] }).then(() => {
                        setTimeout(() => {
                            msg.guild.members.cache.get(msg.author.id).timeout(stats.argtosec(args[2])*1000).catch(() => {})
                        },13*1000)
                    })
                } else {
                    msg.guild.members.cache.get(args[1].substring(2,args[1].length-1)).timeout(stats.argtosec(args[2])*1000).catch(() => {
                        msg.channel.send('Failed to time out, either the specified user is too high rank or doesnt exist.')
                    })
                }
                break
            case 'expansion':
                let failed = false
                if (msg.guild.members.fetch(args[2].substring(2,args[2].length-1)).then((m) => {
                    if (m.roles.highest == '1193709967228805222') {
                        return false
                    }
                }).catch(() => { return false; })) {
                    if (args[1] == 'infinitevoid') {
                        if (secure[args[2].substring(2,args[2].length-1)]) {
                            msg.reply({ files: ['./tags/Reversal.webm'] }).then(() => {
                                setTimeout(() => {
                                    msg.guild.members.addRole({user: msg.author.id, role: '1193552982806106182'}).then(() => {
                                        if (args[3]) {
                                            setTimeout(() => {
                                                msg.guild.members.removeRole({user: msg.author.id, role: '1193552982806106182'}).catch(() => {})
                                            },stats.argtosec(args[3])*1000)
                                        }
                                    }).catch(() => {})
                                },13*1000)
                            })
                        } else {
                            msg.guild.members.addRole({user: args[2].substring(2,args[2].length-1), role: '1193552982806106182'}).then(() => {
                                if (args[2].substring(2,args[2].length-1) == '772929718047473724') {
                                    msg.channel.send('https://tenor.com/view/gate-close-jujutsu-kaisen-gojo-prison-realm-sealed-gif-11882127185527302352')
                                } else {
                                    msg.channel.send('https://tenor.com/view/gojo-domain-expansion-gif-19197982')
                                }
                                if (args[3]) {
                                    setTimeout(() => {
                                        msg.guild.members.removeRole({user: args[2].substring(2,args[2].length-1), role: '1193552982806106182'}).catch(() => {})
                                    },stats.argtosec(args[3])*1000)
                                }
                            }).catch(() => {
                                msg.channel.send('Domain Expansion failed, either the specified user is too high rank, doesnt exist or is already in a domain.')
                                failed = true
                            })
                        }
                    } else if (args[1] == 'malevolentshrine') {
                        if (secure[args[2].substring(2,args[2].length-1)]) {
                            msg.reply({ files: ['./tags/Reversal.webm'] }).then(() => {
                                setTimeout(() => {
                                    msg.guild.members.ban(msg.author.id).then(() => {
                                        setTimeout(() => {
                                            msg.guild.bans.remove(msg.author.id).catch(() => {})
                                        },stats.getRandomInt(5*60*1000,10*60*1000))
                                    }).catch(() => {})
                                },13*1000)
                            })
                        } else {
                            msg.guild.members.ban(args[2].substring(2,args[2].length-1)).then(() => {
                                msg.channel.send('https://tenor.com/view/sukuna-malevolent-shrine-shibuya-jujutsu-kaise-jjk-gif-17518408518425958955')
                                setTimeout(() => {
                                    msg.guild.bans.remove(args[2].substring(2,args[2].length-1)).catch(() => {})
                                },stats.getRandomInt(5*60*1000,10*60*1000))
                            }).catch(() => {
                                msg.channel.send('Domain Expansion failed, either the specified user is too high rank, doesnt exist or is already in a domain.')
                                failed = true
                            })
                        }
                    }
                }
                break
            case 'shrunkage':
                msg.guild.members.removeRole({user: args[1].substring(2,args[1].length-1), role: '1193552982806106182'}).catch(() => {
                    msg.channel.send('Domain Shrunkage failed, either the specified user is too high rank, doesnt exist or is not in domain expansion.')
                })
                break
            case 'role':
                if (args[1] == 'remove') {
                    msg.guild.members.removeRole(({user: args[2].substring(2,args[2].length-1), role: args[3]})).catch(() => {
                        msg.channel.send('Failed to remove role, role is either too high or rashbot lacks permissions.')
                    })
                } else if (args[1] == 'add') {
                    msg.guild.members.addRole({user: args[2].substring(2,args[2].length-1), role: args[3]}).catch(() => {
                        msg.channel.send('Failed to add role, role is either too high or rashbot lacks permissions.')
                    })
                }
                break
            case 'selfrole':
                if (args[1] == 'remove') {
                    msg.guild.members.removeRole({user: msg.author.id, role: args[2]}).catch(() => {
                        msg.channel.send('Failed to remove role, role is either too high or rashbot lacks permissions.')
                    })
                } else if (args[1] == 'add') {
                    msg.guild.members.addRole({user: msg.author.id, role: args[2]}).catch(() => {
                        msg.channel.send('Failed to add role, role is either too high or rashbot lacks permissions.')
                    })
                }
                break
            case 'unban':
                msg.guild.bans.remove(args[1].substring(2,args[1].length-1)).catch(() => {
                    msg.channel.send('Failed to ban, user is either not banned or is not a valid user id.')
                })
                break
            case 'rng':
                msg.reply(`${stats.getRandomInt(args[1],args[2])}`)
                break
            case 'wipe':
                if (secure[args[1].substring(2,args[1].length-1)]) {
                    msg.reply({ files: ['./tags/Reversal.webm'] }).then(() => {
                        setTimeout(() => {
                            msg.guild.members.addRole({user: msg.author.id, role: '1196190338797273108'})
                        },13*1000)
                    })
                } else {
                    msg.channel.send("This next one's gonna wipe you off the face of the planet!").then((omsg) => {
                        omsg.reply({ files: [`./tags/GogetaBlueFFK.mp4`] }).then(() => {
                            setTimeout(() => {
                                msg.guild.members.addRole({user: args[1].substring(2,args[1].length-1), role: '1196190338797273108'})
                            },27.5*1000)
                        }).catch((err) => { console.log(err); })
                    }).catch((err) => { console.log(err); })
                }
                break
            case 'revive':
              msg.guild.members.removeRole({user: args[1].substring(2,args[1].length-1), role: '1196190338797273108'})
              break
            case 'stop':
                if (msg.author.id == '1168868176189198418') {
                    msg.reply('Stopping rash-bot...')
                    process.exit(22)
                }
                break
            case 'give':
                stats.baseUser.findOne({ where: { id: msg.author.id }}).then((usr) => {
                    if (usr) {
                        if (usr.rp >= Math.round(Number(args[2])) && Math.sign(Number(args[1])) == 1) {
                            stats.baseUser.findOne({ where: { id: args[1].substring(2,args[1].length-1) }}).then((user) => {
                                if (user) {
                                    usr.decrement('rp', { by: Math.round(Number(args[2])) }).then(() => {
                                        user.increment('rp', { by: Math.round(Number(args[2])) }).then(() => {
                                            msg.reply(`Transferred ${Math.round(Number(args[2]))} R-Points to ${args[1]}.`)
                                        })
                                    })
                                }
                            })
                        } if (Math.sign(Number(args[1])) == -1) {
                            msg.reply('Cant give others negative amounts.')
                        } else {
                            msg.reply(`Not a valid number, or you lack R-Points. (broke boy)`)
                        }
                    }
                })
                break
            case 'coinflip':
                stats.baseUser.findOne({ where: { id: msg.author.id }}).then((usr) => {
                    if (usr) {
                        if (usr.rp >= Math.round(Number(args[1])) && Math.round(Number(args[1])) != 0 && Math.sign(Number(args[1])) == 1) {
                            usr.decrement('rp', { by: Math.round(Number(args[1])) }).then((user) => {
                                const coinflip = stats.getRandomInt(1,10)
                                if (!args[2]) { args[2] == 'heads'; }
                                if (coinflip >= 5 && args[2].toLowerCase() == "heads") { // heads
                                    user.increment('rp', { by: Math.round(Number(args[1])*2) }).then(() => {
                                        msg.reply(`You won ${Math.round(Number(args[1])*2)} R-Points.`)
                                    })
                                } else if (coinflip <= 5 && args[2].toLowerCase() == "tails") { // tails
                                    user.increment('rp', { by: Math.round(Number(args[1])*2) }).then(() => {
                                        msg.reply(`You won ${Math.round(Number(args[1])*2)} R-Points.`)
                                    })
                                } else {
                                    msg.reply(`You lostttt <:damn:1191710236944367626>`)
                                }
                            })
                        } else if (Math.round(Number(args[1])) == 0 || Math.sign(Number(args[1])) == -1) {
                            msg.reply('Cant coinflip 0 or any negative numbers.')
                        } else {
                            msg.reply(`Not a valid number, or you lack R-Points. (broke boy)`)
                        }
                    }
                })
                break
            case 'set':
                if (msg.member.roles.highest.id == '1198041664804106250') {
                    try {
                        stats.baseUser.findOne({ where: { id: args[1] }}).then((usr) => {
                            if (args[3].substring(args[3].length-1) == 'a') {
                                usr[args[2]] = args[3].substring(0,args[3].length-1)
                            } else {
                                usr[args[2]] = usr[args[2]] + args[3]
                            }
                            usr.save();
                        }).catch((err) => { console.log(err); })
                    } catch (error) {
                        console.log(error);
                    }
                }
                break
        }
    } else {
        switch (action) {
            case 'rng':
                msg.reply(`${stats.getRandomInt(args[1],args[2])}`)
                break
            case 'give':
                stats.baseUser.findOne({ where: { id: msg.author.id }}).then((usr) => {
                    if (usr) {
                        if (usr.rp >= Math.round(Number(args[2])) && Math.sign(Number(args[1])) == 1) {
                            stats.baseUser.findOne({ where: { id: args[1].substring(2,args[1].length-1) }}).then((user) => {
                                if (user) {
                                    usr.decrement('rp', { by: Math.round(Number(args[2])) }).then(() => {
                                        user.increment('rp', { by: Math.round(Number(args[2])) }).then(() => {
                                            msg.reply(`Transferred ${Math.round(Number(args[2]))} R-Points to ${args[1]}.`)
                                        })
                                    })
                                }
                            })
                        } if (Math.sign(Number(args[1])) == -1) {
                            msg.reply('Cant give others negative amounts.')
                        } else {
                            msg.reply(`Not a valid number, or you lack R-Points. (broke boy)`)
                        }
                    }
                })
                break
            case 'coinflip':
                stats.baseUser.findOne({ where: { id: msg.author.id }}).then((usr) => {
                    if (usr) {
                        if (usr.rp >= Math.round(Number(args[1])) && Math.round(Number(args[1])) != 0 && Math.sign(Number(args[1])) == 1) {
                            usr.decrement('rp', { by: Math.round(Number(args[1])) }).then((user) => {
                                const coinflip = stats.getRandomInt(1,10)
                                if (!args[2]) { args[2] == 'heads'; }
                                if (coinflip >= 5 && args[2].toLowerCase() == "heads") { // heads
                                    user.increment('rp', { by: Math.round(Number(args[1])*2) }).then(() => {
                                        msg.reply(`You won ${Math.round(Number(args[1])*2)} R-Points.`)
                                    })
                                } else if (coinflip <= 5 && args[2].toLowerCase() == "tails") { // tails
                                    user.increment('rp', { by: Math.round(Number(args[1])*2) }).then(() => {
                                        msg.reply(`You won ${Math.round(Number(args[1])*2)} R-Points.`)
                                    })
                                } else {
                                    msg.reply(`You lostttt <:damn:1191710236944367626>`)
                                }
                            })
                        } else if (Math.round(Number(args[1])) == 0 || Math.sign(Number(args[1])) == -1) {
                            msg.reply('Cant coinflip 0 or any negative numbers.')
                        } else {
                            msg.reply(`Not a valid number, or you lack R-Points. (broke boy)`)
                        }
                    }
                })
                break
        }
    }
}
module.exports = {
    name: 'action',
    execute: execute
}
