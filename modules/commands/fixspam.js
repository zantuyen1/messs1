const fs = global.nodemodule['fs-extra'];
module.exports.config = {
  name: "fix-spam",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "fix-spam chửi bot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = function({ api, event}) {
  var { threadID, messageID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
 
  var userID = `${event.senderID}`;

  if ((event.body.toLowerCase() == "Bot ngu") || (event.body.toLowerCase() == "bot như cc") || (event.body.toLowerCase() == "bot nhu cc") ||  (event.body.toLowerCase() == "bot củ lồn") || (event.body.toLowerCase() == "Bot như lon") || (event.body.toLowerCase() == "Bot ngu lồn")) {
    data.banned = 1;
    data.dateAdded = time;
    global.data.userBanned.set(userID, { dateAdded: data.dateAdded });
    return api.sendMessage(`Bạn đã bị ban, không thể sử dụng bot!, lý do: chửi bot `, threadID)
  };
}

module.exports.run = function({ api, event }) { }