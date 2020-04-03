// const dgram = require('dgram');
// const urlParser = require('url').parse;
// const socket = dgram.createSocket('udp4');

convert_object_to_string = function (obj) {
    return str =" Kills: " + obj.kills + " | Deaths: " + obj.deaths + " | Headshots: " + obj.headshots + " | Assists: " + obj.assists + " | Hours on Server: " + convert_seconds_to_hour(obj.secsonserver);  
};

convert_seconds_to_hour = function (str){
    return ((str*1) / 60 / 60).toFixed(3); 
}

exports.msgEmbedTopPlayers = function(Discord, result){
    counter = 1;
    var exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed.setColor('#0099ff');
    exampleEmbed.setTitle('Rank of top 10 players in Cszin CSGO server');
    exampleEmbed.setAuthor('This bot was made by queijocoalho');
    exampleEmbed.setDescription('To play in this server access -> connect 34.95.198.26:27015;password cszin5643');
    exampleEmbed.setTimestamp();

    Object.keys(result).forEach(function(key) {
        var val = result[key];
        console.log("Rank = " + counter + " -> " + convert_object_to_string(val));
        exampleEmbed.addFields({name:"["+counter+"] Player -> " +val.name, value: convert_object_to_string(val)});
        counter++;
    });

    return exampleEmbed
};

exports.msgEmbedPlayer = function(Discord, result, player){
    counter = 1;
    var exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed.setColor('#0099ff');
    exampleEmbed.setTitle('Stats of ' + player);
    exampleEmbed.setAuthor('This bot was made by queijocoalho');
    exampleEmbed.setDescription('To play in this server access -> connect 34.95.198.26:27015;password cszin5643');
    exampleEmbed.setTimestamp();

    Object.keys(result).forEach(function(key) {
        var val = result[key];
        exampleEmbed.addFields({name:"[ "+player+" ]", value: convert_object_to_string(val)});
        counter++;
    });

    return exampleEmbed
};

exports.msgEmbedHelp = function(Discord){
    var exampleEmbed = new Discord.MessageEmbed();
    exampleEmbed.setColor('#0099ff');
    exampleEmbed.setTitle("The help page of commands available in this bot!");
    exampleEmbed.setAuthor('This bot was made by queijocoalho');
    exampleEmbed.setDescription('To play in this server access -> connect 34.95.198.26:27015;password cszin5643');
    exampleEmbed.setTimestamp();

    exampleEmbed.addFields({name:"[ !help ]", value: "This page of commands avaiable "});
    exampleEmbed.addFields({name:"[ !stats <player name ]", value: "Stats of <player name>"});
    exampleEmbed.addFields({name:"[ !top ]", value: "Rank of top 10 players in Cszin CSGO server"});

    return exampleEmbed
};

exports.msgEmbedInfo = function(Discord, state){

    var exampleEmbed = new Discord.MessageEmbed(); 
    exampleEmbed.setColor('#0099ff');
    exampleEmbed.setTitle("Status of the " +state.name+ " server");
    exampleEmbed.setAuthor('This bot was made by queijocoalho');
    exampleEmbed.setDescription('To play in this server access -> connect 34.95.198.26:27015;password cszin5643');
    exampleEmbed.setTimestamp();

    exampleEmbed.addFields({name:"[ name: ]", value: state.name});
    exampleEmbed.addFields({name:"[ map ]", value: state.map});
    exampleEmbed.addFields({name:"[ Players Onlines ]", value: state.raw.numplayers});
    exampleEmbed.addFields({name:"[ Bot Onlines ]", value: state.raw.numbots});
    exampleEmbed.addFields({name:"[ Max Players ]", value: state.maxplayers});   

    return exampleEmbed;

};