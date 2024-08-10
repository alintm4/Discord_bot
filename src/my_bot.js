require('dotenv').config()

const {Client, GatewayIntentBits} =require('discord.js')

// bot
const client= new Client(
    {intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers ,
        ],
    });
    const Prefix="/";

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in`); //discord-bot login
})


client.on('messageCreate',async (message)=>{
  if(message.author.bot) return ; //bot ko message lai wasta no

//   console.log(message.content)// user message read
// if(message.content === 'hello'){
//     message.channel.send('hello'); // to send message to the discord server
// }

if(message.content.startsWith(Prefix)){
    const [bot_cmd,...arguments]=message.content
    .trim()
    .substring(Prefix.length)
    .split(" ")

    if(bot_cmd==='kicky'){
 if(arguments.length === 0)return message.reply('please provide an id')
    const memberId = arguments[0];
            try {
                let member = message.guild.members.cache.get(memberId);
                if (!member) {
                    member = await message.guild.members.fetch(memberId);
                }
                
                if (member) {
                    await member.kick();
                    message.channel.send(`Member ${member.user.tag} has been kicked.`);
                } else {
                    message.channel.send('That member was not found.');
                }
            } catch (error) {
                console.error('Error kicking member:', error);
                message.channel.send('An error occurred while trying to kick the member.');
            }
        }
}

})


client.login(process.env.DISCORDJS_BOT_TOKEN)

