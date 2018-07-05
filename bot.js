const Eris = require("eris");
var bot = new Eris.CommandClient("NDI2NTUzMjUyNjk2MjkzMzc2.Dh8H5w.XuCFAVKv7nAd4fBjN1JnVjMrWvY", {}, {
    description: "Бот с разными полезностями для Просто Сервера",
    owner: "andysha#2148",
    prefix: "*"
});
bot.on("ready", () => {
    console.log("Готов!");
    bot.editStatus("online", {name: "мемасики | *help", type: 3});
});

bot.registerCommandAlias("помощь", "help");
bot.on("messageCreate", (msg) => {
  //Функционал для обоих серверов
  if(msg.mentionEveryone){
    msg.addReaction("FeelsPingedMan:462831919848095755");
    console.log(`${msg.author.username} всех призвал!`);
  }
  if(typeof msg.mentions[0] !== 'undefined'){
    msg.mentions.forEach(item => {
      if(item.id == 463122204377219082){
        console.log(`${msg.author.username} меня призвал!`);
        msg.channel.createMessage("Не надо меня призывать, *help - помощь по командам");
        return;
      }
    });
  }
  //Функционал для ОНЛ
  if(msg.channel.id == 352033994587504640 && ( typeof msg.attachments[0] !== 'undefined' || msg.content.search('((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))') !== -1)){
    console.log("Заценил мемасик в ОНЛ");
    msg.addReaction("thonk:380570863873032192");
    msg.addReaction("lul1:463923338851385345");
    msg.addReaction("lul2:463923398079283201");
    msg.addReaction("lul3:463923428135796737");
    msg.addReaction("lul4:463923464420458516");
  }
  //Функционал для Просто Сервера
  if(msg.channel.id == 371446270264606742 && ( typeof msg.attachments[0] !== 'undefined' || msg.content.search('((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))') !== -1)){
    console.log("Заценил мемасик на Просто Сервере");
    msg.addReaction("thonk:380570863873032192");
    msg.addReaction("lul1:463923338851385345");
    msg.addReaction("lul2:463923398079283201");
    msg.addReaction("lul3:463923428135796737");
    msg.addReaction("lul4:463923464420458516");
  }
});

bot.on("messageReactionAdd", (msg, emoji, id) =>{
  if(emoji.name == "face_palm" || emoji.name == "🤦"){
    console.log(`${msg.author.username} опечатался, ${msg.channel.guild.members.get(id).username} нашёл опечатку`);
    msg.channel.createMessage("тест");
  }
});

bot.registerCommand("choose", (msg, args) => {
  console.log(`Выбрал за ${msg.author.username}, что делать`);
  var variants = args.toString().split(",|,");
  var result = "Я решил за тебя, что тебе сделать:\n";
  for (let i = 0; i < variants.length; i++) {
    result = result + `${variants[i]} - ${Math.floor(Math.random() * 100) + 1}% необходимости\n`;
  }
  return result;
}, {
  argsRequired: true,
  description: "Выбрать что-нибудь",
  fullDescription: "Решить за Вас, что поделать или выбрать",
  usage: "Синтаксис: *choose <вариант 1> | [вариант 2] | [вариант  n]",
  aliases: ["выбор", "выбери", "выбрать"]
});

bot.connect();
