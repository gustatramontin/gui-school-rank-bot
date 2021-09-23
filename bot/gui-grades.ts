
import { Client, Message } from 'discord.js'
import getGrades from '../webscrapper';
import DB from './db'

const client = new Client();

const DiscordCommands = require('@gtramontin/discord-commands')

const bot = new DiscordCommands.bot('grades', client, {
    acceptBot: false
})

const Database = new DB()

const {
    token
} = require('./config.json')


client.on('ready', () => {
    console.log(`Logged in as client.user.tag!`);
})


bot.command('ping', async (msg: any) => {
    await msg.channel.send('pong 🏓')
})

bot.command('add', async (msg: Message, matricula: string, nascimento: string) => {
    const matriculaRegex: RegExp = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/i

    const nascimentoRegex: RegExp = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/i

    if (!matriculaRegex.test(matricula)) {
        msg.channel.send(`${msg.author.toString()} você digitou a matricula da forma errada!`)
        return
    }

    if (!nascimentoRegex.test(nascimento)) {
        msg.channel.send(`${msg.author.toString()} você digitou a data de nascimento da forma errada!`)
        return
    }

    interface Grade  {
        name: string,
        mean: number
    }

    const data: Grade = await getGrades(matricula, nascimento)

    Database.addGrade(data.name, data.mean)
    let emoji: string
    if (data.mean >= 8)
        emoji = "😱"
    else if (data.mean == 7)
        emoji = "😑"
    else
        emoji = "😒"

    msg.channel.send(`A média de ${data.name} é ${data.mean} ${emoji}`)

})

bot.command('show', async (msg: any) => {

    const grades: Object = Database.getGrades()

    let message: string = ""

    for ( let name of Object.keys(grades)) {
        message += `${name} -> ${grades[name].toFixed(2)}\n`
    }

    await msg.channel.send(message)
})
/*
bot.command('move', async (msg: any, channel_name: any, person: any) => {

    const channel = await client.channels.fetch(channel_name)

    console.log(person)

    const fetchUser = await client.users.fetch(person.slice(3, -1))

    fetchUser.voice.setChannel(channel)

})*/

bot.command('rebot', async (msg: any) => {
    await msg.channel.send('accept bot')
})

bot.command('say-my-name', async (msg: any, name: string, lastName: string) => {
    await msg.channel.send(`Hello ${name} ${lastName}`)
})


bot.command('', async (msg: any) => {
    if (msg.author.bot)
        return

    const message: string = msg.content

    const numberOfUppercases: number = message.split('').reduce((total: number, current: string) => {

        if (current === current.toUpperCase() && ![1,2,3,4,5,6,7,8,9,0].includes(Number(current))) {
            return total + 1
        }
        return total
    }, 0)


    const maxPercentageOfUppercase = 0.8 // 80%

    if (numberOfUppercases / message.length >= maxPercentageOfUppercase) {
        await msg.delete({
            timeout: 500    
        })
        await msg.channel.send(`${msg.author.toString()} proibido spam!`)
    }
})



client.login(token)