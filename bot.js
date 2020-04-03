const Discord = require('discord.js');
var mysql = require('mysql');
const help = require('./help.js')
var query = require('game-server-query');
const Connection = require("./db_connection.js")
const client = new Discord.Client();
const config = require("./config.json")


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    if(!msg.content.startsWith(config.prefix)) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando === "top"){
        Connection.init().connect(function(err) {
            if (err) throw err;
            const query = "SELECT  name, kills, deaths, headshots, assists, secsonserver FROM `players` ORDER BY kills DESC LIMIT 10;";
            Connection.init().query(query, function (err, result, fields)  {
                    if (err) throw err;
                    console.log(Object.keys(result).length);
                    msg.channel.send(help.msgEmbedTopPlayers(Discord,result));
                });
            
        });
    }

    if (comando === "stats"){
        player = args.shift();
        
        if (player === undefined){
            msg.reply("Use: !stats <player name> ");
            return;
        }

        Connection.init().connect(function(err) {
            if (err) throw err;
            const query = "SELECT kills, deaths, shots, hits, headshots, assists, secsonserver FROM `players` WHERE `name` =\""+player+"\";";
            Connection.init().query(query, function (err, result, fields)  {
                    if (err) 
                        throw err;
                    if (!result.length ){
                        msg.reply(" This player [ " + player + " ] doesn't have stats  and/or it doesn't have register!");
                    }else{
                        console.log(Object.keys(result).length);
                        msg.channel.send(help.msgEmbedPlayer(Discord,result, player));
                    }
                });
        });

    }

    if (comando === "help"){ 
        msg.channel.send(help.msgEmbedHelp(Discord));
    }

    if (comando === "info"){ 
        query(
            {
                type: 'csgo',
                host: '34.95.198.26:27015'
            },
            function(state) {
                if(!state.error){
                    msg.channel.send(help.msgEmbedInfo(Discord,state));
                }
                else {
                    console.log("Server is offline");
                    return "Server is offline";
                }  
            }
        );

    }

});

client.login(config.token);