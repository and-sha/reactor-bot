const Eris = require("eris");
var bot = new Eris.CommandClient("NDYzMTIyMjA0Mzc3MjE5MDgy.Dhr18Q.gh6FhWTuYDCut7pU_qObEt43BrE", {}, {
    description: "Оно по-идее будет реагировать",
    owner: "andysha#2148",
    prefix: "*"
});
bot.on("ready", () => {
    console.log("Готов!");
    bot.editStatus("online", {name: "мемасики", type: 3});
});

bot.registerCommandAlias("помощь", "help");
bot.on("messageCreate", (msg) => {
  if(msg.mentionEveryone){
    msg.addReaction("FeelsPingedMan:462831919848095755");
    console.log(`${msg.author.username} всех призвал!`);
  }
  if(msg.channel.id == 352033994587504640 && ( typeof msg.attachments[0] !== 'undefined' || msg.content.search('((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))') !== -1)){
    console.log("Заценил мемасик");
    msg.addReaction("thonk:380570863873032192");
    msg.addReaction("lul1:463923338851385345");
    msg.addReaction("lul2:463923398079283201");
    msg.addReaction("lul3:463923428135796737");
    msg.addReaction("lul4:463923464420458516");
  }
  if(typeof msg.mentions[0] !== 'undefined'){
    msg.mentions.forEach(item => {
      if(item.id == 463122204377219082){
        console.log(`${msg.author.username} меня призвал!`);
        msg.channel.createMessage("зо што");
        return;
      }
    });
  }
});

bot.on("messageReactionAdd", (msg, emoji, id) =>{
  if(emoji.name == "face_palm" || emoji.name == "🤦"){
    console.log(`${msg.author.username} опечатался, ${msg.channel.guild.members.get(id).username} нашёл опечатку`);
    msg.channel.createMessage("тест");
  }
});

bot.connect();
