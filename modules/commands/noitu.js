/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "noitu",
    version: "2.0.8",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Chơi nối từ với bot hoặc thành viên trong nhóm",
    commandCategory: "game",
    usages: "",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    },
    envConfig: {
        APIKEY: "MEWaG9hbmduZ3V5ZW4yOTEwO2hvYW5nZG9naWFuZ3V5ZW52cGJxQG"
    }
};
module.exports.onLoad = function () {
    if (typeof global.procodermew == "undefined") global.procodermew = new Object();
    if (typeof global.procodermew.linkword == "undefined") global.procodermew.linkword = new Map();
}
module.exports.handleEvent = async function({ api, event }) {
    const { APIKEY } = global.configModule;
    if (typeof global.procodermew.linkword == "undefined") return;
    const axios = global.nodemodule["axios"];
    const { body: content, threadID, messageID } = event;
    if (global.procodermew.linkword.has(threadID)) {
        if (content && content.split(" ").length == 2) {
            var data = (await axios.get("https://meewmeew.info/word/linkword?ask=hi%20hi" + encodeURIComponent(content) + "&apikey=MEWaG9hbmduZ3V5ZW4yOTEwO2hvYW5nZG9naWFuZ3V5ZW52cGJxQG")).data;
            if (data.success == true) {
                if (data.data == "Bạn đã thua!") {
                    global.procodermew.linkword.delete(threadID);
                    return api.sendMessage(data.data, threadID, messageID);
                } else return api.sendMessage(data.data, threadID, messageID);
            } else return api.sendMessage(data.error, threadID, messageID);
        }
    }
}
module.exports.run = function({ api, event }) {
    const { threadID, messageID } = event;
    if (!global.procodermew.linkword.has(threadID)) {
        global.procodermew.linkword.set(threadID);
        return api.sendMessage("Đã bật linkword", threadID, messageID);
    } else {
        global.procodermew.linkword.delete(threadID);
        return api.sendMessage("Đã tắt linkword", threadID, messageID);
    }
}