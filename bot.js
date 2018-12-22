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
  //Функционал для ОНЛ(Здесь был Дор и Платинум)
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
    msg.addReaction("rolf:469056924625928202");
  }
});

bot.on("messageReactionAdd", (msg, emoji, userid) =>{
  /*if(emoji.name == "face_palm" || emoji.name == "🤦"){
    console.log(`${msg.author.username} опечатался, ${msg.channel.guild.members.get(userid).username} нашёл опечатку`);
    msg.channel.createMessage("тест");
  }*/
  if(emoji.name == "🔽" && typeof msg.embeds[0] !== 'undefined' && userid != "426553252696293376"){
    if(msg.embeds[0].title == "Список команд бота:"){
      msg.edit({ "embed": {
        "title": "Другие функции:",
        "description": "На данный момент бот так же может реагировать на мемы из спец. каналов, на призывы @everyоne, призывы самого себя"
      }});
    };
  };
  try{
  if(emoji.id == "469056924625928202" && msg.author.id == userid){
    msg.removeReaction("rolf:469056924625928202", userid);
  };
  if(emoji.id == "469056924625928202" && msg.author.id != userid){
    var count = msg.reactions[emoji.id ? `${emoji.name}:${emoji.id}` : emoji.name].count;
    if(count > 2){
      msg.pin()
    };
  };
  if(emoji.id == "464610690628452352"){
    var count = msg.reactions[emoji.id ? `${emoji.name}:${emoji.id}` : emoji.name].count;
    if(count > 2){
      msg.delete(); //Удаление сообщения при 3 баянах
      var byndate = new Date(msg.timestamp);
      bot.createMessage(bot.getDMChannel("348766778501103616"), `Удалён баян от ${msg.author.username} (${msg.author.id}), дата отправки ${byndate.toUTCString()}`);
    };
  };
  } catch(err) { console.log("Сасай, ошибка!"); };
});

bot.on("messageDelete", (msg) => {
  if (typeof msg.content !== 'undefined'){
    var date = new Date(msg.timestamp);
    if (typeof msg.attachments[0] !== 'undefined'){
      bot.createMessage("470759072967426049", `Удалено сообщение от ${msg.author.username}, написанное ${date.toUTCString()} в <#${msg.channel.id}> (#${msg.channel.name}): "${msg.content}". К сообщению было что-то прикреплено.`);
    } else {
      bot.createMessage("470759072967426049", `Удалено сообщение от ${msg.author.username}, написанное ${date.toUTCString()} в <#${msg.channel.id}> (#${msg.channel.name}): "${msg.content}".`);
    };
  } else {
    bot.createMessage("470759072967426049", `Удалено сообщение из канала <#${msg.channel.id}> (#${msg.channel.name}).`);
  };
});

bot.on("messageDeleteBulk", (msgs) => {
  msgs.forEach(msg => {
    if (typeof msg.content !== 'undefined'){
      var date = new Date(msg.timestamp);
      if (typeof msg.attachments[0] !== 'undefined'){
        bot.createMessage("470759072967426049", `Удалено сообщение от ${msg.author.username}, написанное ${date.toUTCString()} в <#${msg.channel.id}> (#${msg.channel.name}): "${msg.content}". К сообщению было что-то прикреплено.`);
      } else {
        bot.createMessage("470759072967426049", `Удалено сообщение от ${msg.author.username}, написанное ${date.toUTCString()} в <#${msg.channel.id}> (#${msg.channel.name}): "${msg.content}".`);
      };
    } else {
      bot.createMessage("470759072967426049", `Удалено сообщение из канала <#${msg.channel.id}> (#${msg.channel.name}).`);
    };
  });
});

bot.on("guildMemberUpdate", (guild, member) => {
  if (guild.id == "371444757102329857"){
    member.roles.forEach(role => {
      if (role == "471106194035965953" && member.nick != "Тупой ник"){
        member.edit({nick: "Тупой ник"});
        bot.createMessage(member.user.getDMChannel(), "Администрация Просто Сервера решила, что у Вас тупой ник. Исправьте его и обратитесь к администратору");
      };
    });
  };
});

bot.on("guildMemberAdd", (guild, member) => {
  if (guild.id == "371444757102329857"){
    if (member.bot){
      member.addRole("371458326095200260");
    } else {
      member.addRole("425149859712991262");
    };
  };
});

bot.registerCommand("choose", (msg, args) => {
  console.log(`Выбрал за ${msg.author.username}, что делать`);
  var variants = args.join(" ").split(" | ");
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
    bot.createRole("371444757102329857", {name: "", color: correctColor}).then( (role) => {
      role.editPosition(20);
      var m = bot.guilds.get("371444757102329857").members.get(msg.author.id);
      deleteCustomColor(m);
      obj.find(x => x.id == m.id).color = role.id;
      m.addRole(role.id);
      role.editPosition(20);
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
        },
        {
          "name": "change",
          "value": "Позволяет доверенным менять название и описание основного канала\nАлиасы: `поменять`, `изменить`\nСинтаксис: `*change <name|название|имя> [название канала (оставить пустым для #главный)]`\n`*change <topic|description|описание> [описание канала (оставить пустым для \"Общение происходит тут\")]`",
          "inline": true
        }
      ],
    }}).then(rsp => {
      rsp.addReaction("🔽");
    });
}, {});

bot.registerCommand("delete", (msg, args) => {
  if(parseInt(args[0], 10) == NaN){
    return "Некорректный ввод!";
  } else {
    if (args[0] == 0){
      return "ПОДУМОЙ";
    } else {
      if (typeof msg.mentions[0] !== 'undefined'){
        msg.channel.purge(args[0], (msgdel) => {
          if (msgdel.author == msg.mentions[0]) {return true;} else {return false;};
        });
      } else {
        msg.channel.purge(args[0]);
      };
    };
  };
}, {
  requirements: {
    permissions: {
      "manageMessages": true
    }
  },
  deleteCommand: true
});

var change = bot.registerCommand("change", (msg, args) => {} ,{
  reqiurements: {
    roleIDs: "371444965860966402"
  },
  deleteCommand: true,
  aliases: ["поменять", "изменить"]
});

change.registerSubcommand("name", (msg, args) => {
  if (args == ""){
    bot.guilds.get("371444757102329857").channels.get("371447189815296001").edit({name: "главный"});
  } else {
    args = args.join("-");
    bot.guilds.get("371444757102329857").channels.get("371447189815296001").edit({name: args});
  };
  return;
}, {
  reqiurements: {
    roleIDs: "371444965860966402"
  },
  deleteCommand: true,
  aliases: ["название", "имя"]
});

change.registerSubcommand("topic", (msg, args) => {
  if (args == ""){
    bot.guilds.get("371444757102329857").channels.get("371447189815296001").edit({topic: "Общение происходит тут"});
  } else {
    args = args.join(" ");
    bot.guilds.get("371444757102329857").channels.get("371447189815296001").edit({topic: args});
  };
  return;
}, {
  reqiurements: {
    roleIDs: "371444965860966402"
  },
  deleteCommand: true,
  aliases: ["описание", "description"]
});

/* код правил, сохранён для дальнейших изменений
var hook = bot.registerCommand("hook", (msg) => {},{});
hook.registerSubcommand("faewfaefxzcvf4tsadwdah", (msg) => {
  bot.executeWebhook("467847950035451914", "hN20xQemTfGhpSGDtiap5lEkmaVP8CMOo7vU4RISaKlR6mmhKThDMXh1ee0x92vKoEr", {
    embeds: [{
      "author": {"icon_url": "https://puu.sh/AuSYy/3763b788ec.jpg", "name": "Добро пожаловать на Просто Сервер"},
      "description": "На данном сервере можно общаться на различную тематику, найти себе напарника/соперника для игры. Так же тут лениво выходит различное творчество andysha#2148",
      "footer": {"text":"Последняя редакция правил от"},
      "timestamp": "2018-07-24T01:00:18.000Z",
      "color": 9090812
    },
    {
      "author": {"icon_url": "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/heavy-exclamation-mark-symbol_2757.png", "name": "Правило первое:"},
      "title": "*Спам запрещён*",
      "description": "Спамом считается отправка нескольких одинаковых сообwений подряд",
      "footer": {"text":"Спам будет караться предупреждением -> 6-часовыми мутами"},
      "color": 12704255
    },
    {
      "author": {"icon_url": "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/heavy-exclamation-mark-symbol_2757.png", "name": "Правило второе:"},
      "title": "*NSFW запрещено*",
      "description": "За NSFW считаются изображения/словесное описание эротики, порнографии, натуралистичного насилия, гуро",
      "footer": {"text": "Отправка NSFW будет караться суточным мутом"},
      "color": 12704255
    },
    {
      "author": {"icon_url": "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/heavy-exclamation-mark-symbol_2757.png", "name": "Правило третье:"},
      "title": "*Обмен инвайтами по принципу взаиморекламы*",
      "description": "Кидать инвайты серверов можно по предварительной договорённости со мной при условиях, что\n1) Вы модератор/администратор сервера,\n2) Вы позволяете мне прорекламировать этот сервер или реклама изначально разрешена правилами Вашего сервера\n(если пользователь просит инвайт на какой-то сервер, то отправьте его в лс пользователя, не в общий чат)",
      "footer": {"text": "Отправка инвайтов без соблюдения договорённостей наказывается баном"},
      "color": 12704255
    },
    {
      "author": {"icon_url": "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/heavy-exclamation-mark-symbol_2757.png", "name": "Правило четвёртое:"},
      "title": "*Используйте здравый смысл*",
      "description": "Если правила не запрещают чего-то непристойного, то это не значит, что это разрешено.",
      "footer": {"text": "Администраторы имеют право наказывать людей, ведущих себя неподобающе"},
      "color": 12704255
    },
    {
      "author": {"icon_url": "https://puu.sh/AuSYy/3763b788ec.jpg", "name": "Система ролей сервера"},
      "description": "Система ролей проста, есть две привилегированные роли:",
      "fields": [
        {"name": "@Доверенные",
        "value": "Эта роль даёт возможность\n1) Переименовать основной канал,\n2) Создвать серверные emoji,\n3) Создавать серверные стикеры\nДанную роль можно получить, заслужив моё доверие, либо сделав серверу что-то хорошее/полезное, либо сделав мне лично (IRL или нет) что-то полезное (в том числе донат от 50р)"},
        {"name": "@Донатеры",
        "value": "Эта роль даёт все возможности роли @Доверенные + возможность:\n1) Закреплять сообщения\n2) Менять ники другим людям (злоупотребление наказывается)\n3) Серверно мутить буйных в войс чате (злоупотребление наказывается)\n4) Управлять вебхуками\nДанную роль можно получить, пожертвовав мне >250р на [qiwi.me](https://qiwi.me/andysha)"}
      ],
      "color": 9090812
    }]
  });
},{});
*/

bot.connect();
