const Eris = require("eris");
var request = require('request');
const fs = require('fs');
var obj;
var bot = new Eris.CommandClient(process.env.token, {}, {
  description: "Бот с разными полезностями для Просто Сервера",
  owner: "andysha#2148",
  prefix: "*",
  defaultHelpCommand: false,
});
fs.readFile('info.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});
bot.on("ready", () => {
	console.log("Готов!");
  bot.editStatus("online", {name: "мемасики | *help", type: 3});
});

bot.on("messageCreate", (msg) => {
  //Функционал для обоих серверов
  if(msg.mentionEveryone){
    msg.addReaction("FeelsPingedMan:462831919848095755");
    console.log(`${msg.author.username} всех призвал!`);
  }
  if(typeof msg.mentions[0] !== 'undefined'){
    msg.mentions.forEach(item => {
      if(item.id == 426553252696293376){
        console.log(`${msg.author.username} меня призвал!`);
        msg.channel.createMessage("Не надо меня призывать, *help - помощь по командам");
        return;
      }
    });
  }
  //Функционал для ОНЛ(Здесь был Дор)
  if(msg.channel.id == 352033994587504640 && ( typeof msg.attachments[0] !== 'undefined' || msg.content.search('((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))') !== -1)){
    console.log("Заценил мемасик в ОНЛ");
	  msg.addReaction("bayan:464610690628452352");
    msg.addReaction("thonk:380570863873032192");
    msg.addReaction("lul1:463923338851385345");
    msg.addReaction("lul2:463923398079283201");
    msg.addReaction("lul3:463923428135796737");
    msg.addReaction("lul4:463923464420458516");
  }
  //Функционал для Просто Сервера
  if(msg.channel.id == 371446270264606742 && ( typeof msg.attachments[0] !== 'undefined' || msg.content.search('((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))') !== -1)){
    console.log("Заценил мемасик на Просто Сервере");
    msg.addReaction("bayan:464610690628452352");
    msg.addReaction("thonk:380570863873032192");
    msg.addReaction("lul1:463923338851385345");
    msg.addReaction("lul2:463923398079283201");
    msg.addReaction("lul3:463923428135796737");
    msg.addReaction("lul4:463923464420458516");
  }
});

bot.on("messageReactionAdd", (msg, emoji, id) =>{
  /*if(emoji.name == "face_palm" || emoji.name == "🤦"){
    console.log(`${msg.author.username} опечатался, ${msg.channel.guild.members.get(id).username} нашёл опечатку`);
    msg.channel.createMessage("тест");
  }*/
  if(emoji.name == "🔽" && typeof msg.embeds[0] !== 'undefined' && id != "426553252696293376"){
    if(msg.embeds[0].title == "Список команд бота:"){
      msg.edit({ "embed": {
        "title": "Другие функции:",
        "description": "На данный момент бот так же может реагировать на мемы из спец. каналов, на призывы @everyоne, призывы самого себя"
      }});
    };
  };
});

bot.registerCommand("choose", (msg, args) => {
  console.log(`Выбрал за ${msg.author.username}, что делать`);
  var variants = args.toString().split(",|,");
  var result = `Я решил за ${msg.author.username}, что делать:\n`;
  for (let i = 0; i < variants.length; i++) {
    variants[i] = variants[i].split(',').join(' ')
    result = result + `${variants[i]} - ${Math.floor(Math.random() * 100) + 1}% необходимости\n`;
  }
  return result;
}, {
  argsRequired: true,
  description: "Выбрать что-нибудь",
  fullDescription: "Решить за Вас, что поделать или выбрать",
  usage: "Синтаксис: *choose <вариант 1> | [вариант 2] | [вариант  n]",
  aliases: ["выбор", "выбери", "выбрать"],
  deleteCommand: true
});

bot.registerCommand("dog", (msg) => {
  var dog = "";
  request('https://random.dog/woof', function(err, resp, body) {
    dog = body.toString();
    var res = "https://random.dog/" + dog;
    bot.createMessage(msg.channel.id, {
      embed: {
        title: `Пёс для ${msg.author.username}:`,
        image: {url: res}
      }
    });
    console.log(`Пёсель для ${msg.author.username} подан`);
  });
}, {
  aliases: ["пес", "пёс", "песель", "пёсель"],
  description: "Выдаёт рандомного пёселя",
  fullDescription: "Выдаёт рандомного пёселя с https://random.dog/",
  deleteCommand: true
});
//ЗОНА ГОВНОКОДА
//определение цветов
var r = "431725915744108554";
var b = "431726028352782337";
var y = "431726071512039425";
var g = "431726114034155520";
var o = "431726166303440916";
var c = "431726206593794049";
var p = "431726267507671050";

//функция - помощник для команды окраски (необходима оптимизация)
function removeColors(m, add = undefined){
	m.removeRole(r);
  m.removeRole(b);
  m.removeRole(y);
  m.removeRole(g);
  m.removeRole(o);
  m.removeRole(c);
  m.removeRole(p);
  if(add != undefined){
    m.addRole(add);
    obj.find(x => x.id == m.id).color = "";
  };
};

function deleteCustomColor(m, add = undefined){
  if(obj.find(x => x.id == m.id) == undefined){
    obj.push({"id": m.id, "color": ""});
  };
  removeColors(m, add);
  if(obj.find(x => x.id == m.id).color != ""){
    bot.deleteRole("371444757102329857", obj.find(x => x.id == m.id).color);
  };
};

var color = bot.registerCommand("color", (msg, args) => {
  var re = new RegExp('(#{1}(?:[A-F0-9]){6})(?![0-9A-F])','i');
  var color = re.exec(args[0]);
  if(color != null){
    var correctColor = Number.parseInt(color[0].slice(1), 16);
    bot.createRole("371444757102329857", {name: "test", color: correctColor}).then( (role) => {
      role.editPosition(20);
      var m = bot.guilds.get("371444757102329857").members.get(msg.author.id);
      deleteCustomColor(m);
      obj.find(x => x.id == m.id).color = role.id;
      m.addRole(role.id);
      fs.writeFile("info.json", JSON.stringify(obj), (err) => {
        if (err) throw err;
        return `Теперь вы окрашены в ${args[0]}`
      });
    });
  } else {
    return `Некорректный цвет - ${args[0]}`
  };
}, {
	aliases: ["цвет"],
  description: "Даёт цвет",
  fullDescription: "Окрашивает вас",
	requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
color.registerSubcommand("red", (msg) => {
  var member = bot.guilds.get("371444757102329857").members.get(msg.author.id);
  deleteCustomColor(member, r);
	return `Поменял цвет ${msg.author.username} на красный`;
}, {
  aliases: ["красный", "к", "r"],
  description: "Даёт красный цвет",
  fullDescription: "Окрашивает вас в красный",
  requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
color.registerSubcommand("blue", (msg) => {
  var member = bot.guilds.get("371444757102329857").members.get(msg.author.id);
  deleteCustomColor(member, b);
  return `Поменял цвет ${msg.author.username} на синий`;
}, {
  aliases: ["синий", "с", "b"],
  description: "Даёт синий цвет",
	fullDescription: "Окрашивает вас в синий",
  requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
color.registerSubcommand("yellow", (msg) => {
  var member = bot.guilds.get("371444757102329857").members.get(msg.author.id);
  deleteCustomColor(member, y);
  return `Поменял цвет ${msg.author.username} на жёлтый`;
}, {
  aliases: ["жёлтый", "желтый", "y", "ж"],
  description: "Даёт жёлтый цвет",
	fullDescription: "Окрашивает вас в жёлтый",
  requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
color.registerSubcommand("green", (msg) => {
  var member = bot.guilds.get("371444757102329857").members.get(msg.author.id);
  deleteCustomColor(member, g);
  return `Поменял цвет ${msg.author.username} на зелёный`;
}, {
  aliases: ["зелёный", "зеленый", "з", "g"],
  description: "Даёт зелёный цвет",
	fullDescription: "Окрашивает вас в зелёный",
  requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
color.registerSubcommand("orange", (msg) => {
  var member = bot.guilds.get("371444757102329857").members.get(msg.author.id);
  deleteCustomColor(member, o);
  return `Поменял цвет ${msg.author.username} на оранжевый`;
}, {
  aliases: ["оранжевый", "o", "о"],
  description: "Даёт оранжевый цвет",
	fullDescription: "Окрашивает вас в оранжевый",
  requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
color.registerSubcommand("cyan", (msg) => {
  var member = bot.guilds.get("371444757102329857").members.get(msg.author.id);
  deleteCustomColor(member, c);
  return `Поменял цвет ${msg.author.username} на бирюзовый`;
}, {
  aliases: ["бирюзовый", "б", "c"],
  description: "Даёт бирюзовый цвет",
	fullDescription: "Окрашивает вас в бирюзовый",
  requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
color.registerSubcommand("purple", (msg) => {
  var member = bot.guilds.get("371444757102329857").members.get(msg.author.id);
  deleteCustomColor(member, p);
  return `Поменял цвет ${msg.author.username} на фиолетовый`;
}, {
  aliases: ["фиолетовый", "p", "ф"],
  description: "Даёт фиолетовый цвет",
  fullDescription: "Окрашивает вас в фиолетовый",
  requirements: {roleIDs: ["425149859712991262"]},
  deleteCommand: true
});
///ЗОНА ГОВНОКОДА

bot.registerCommand("help", (msg) => {
  msg.channel.createMessage({
    "embed": {
      "title": "Список команд бота:",
      "description": "Если необходима помощь по дополнительым функциям бота, отреагируйте 🔽",
      "fields": [
        {
          "name": "help",
          "value": "Это сообщение",
          "inline": true
        },
        {
          "name": "choose",
          "value": "Выбирает за вас, что вам делать\nАлиасы: `выбор`, `выбери`, `выбрать`\nСинтаксис: `*choose <вариант 1> | [вариант 2] | [вариант  n]`",
          "inline": true
        },
        {
          "name": "dog",
          "value": "Выдаёт рандомного пёселя с https://random.dog/\nАлиасы: `пес`, `пёс`, `песель`, `пёсель`",
          "inline": true
        },
        {
          "name": "color",
          "value": "Окрашивает вас\nАлиас: `цвет`\nСинтаксис: `*color <red|blue|green|yellow|orange|cyan|purple|цвет в формате hex (#a0a0a0)>`\n(у каждого из цветов есть алиас на русском и из первой буквы)\nСвой цвет можно получить [тут](https://www.google.ru/search?q=hex+color)",
          "inline": true
        }
      ],
    }}).then(rsp => {
      rsp.addReaction("🔽");
    });
}, {

});

bot.connect();
