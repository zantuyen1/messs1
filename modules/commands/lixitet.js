module.exports.config = {
    name: "lixi",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SEN", 
    description: "lì xì",
    commandCategory: "Coins",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 12000000
    }
};
module.exports.languages = {
    "vi": {
        "cooldown": "✨Lì xì rồi, quay lại sau: %1 phút %2 giây.✨"      
    },
    "en": {
        "cooldown": "✨lucky money, come back later: %1 minute(s) %2 second(s).✨"
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
const { threadID, messageID, senderID } = event;
let data = (await Currencies.getData(senderID)).data || {};
if (handleReply.author != event.senderID) return api.sendMessage("🧨Học ngu lì xì con cặc🧨", event.threadID, event.messageID)
//random coins nhận được khi làm việc ít nhất 2000 
var coinscn = Math.floor(Math.random() * 1000) + 10; 
var coinsdv = Math.floor(Math.random() * 500) + 10; 
var coinsmd = Math.floor(Math.random() * 1500) + 10; 

//random công việc cần làm
var rdcn = [' Bot', ' Bot', ' Bot', 'Bot', 'Bot']; 
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

var rddv = ['Bot', 'Bot', 'Bot', 'Bot', 'Bot', 'Bot', 'Bot', 'Bot']; 
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

var rdmd = ['Bot', 'Bot', 'Bot', 'Bot', 'Bot ', 'Bot']; 
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 



var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `✨Bạn được ${work1}  lì xì ${coinscn} nghìn , chúc bạn tết vui vẻ🧨` ;await Currencies.increaseMoney(event.senderID, parseInt(coinscn)); break;             
                case "2": msg = `✨Bạn được ${work2} lì xì ${coinsdv} nghìn , chúc bạn tết vui vẻ nha🧨`; await Currencies.increaseMoney(event.senderID, parseInt(coinsdv)); break;
                case "3": msg = `✨Bạn được ${work3} lì xì ${coinsmd} nghìn , chúc bạn tết vui vẻ🧨`; await Currencies.increaseMoney(event.senderID, parseInt(coinsmd)); break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("⚡Vui lòng chọn số ", event.threadID, event.messageID);
            if (choose > 7 || choose < 1) return api.sendMessage("⚡️Lựa chọn không nằm trong danh sách.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "✨Chưa update...") {
                msg = "✨Update soon...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime cho mỗi lần nhận 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 600000) / 1000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage("=== LÌ XÌ ===" +
                "\n\n1.Bao lì xì 1🧧" +
                "\n2. Bao lì xì 2🧧" +
                "\n3. Bao lì xì 3🧧" +
                "\n\n⚡️Hãy reply tin nhắn và chọn theo số để nhận lì xì từ bot nè🧧" //thêm hiển thị case tại đây ||  \n[number]. [Ngành nghề]" +
            , event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}