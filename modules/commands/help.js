module.exports.config = {
	name: "help",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai",
	description: "Hướng dẫn cho người mới",
	commandCategory: "Danh sách lệnh",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 60
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "╭───╮\n    %1\n╰───╯ \n📜Mô tả: %2\n\n» 🧞Credit: %7\n» 📄Hướng dẫn cách dùng: %3\n» 🌟Thuộc nhóm: %4\n» ⏱Thời gian chờ: %5 giây(s)\n» 👥Quyền hạn: %6\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n💥💢💥 Điều Hành Bởi VTD 💥💢💥",
		"helpList": '≻─────── •👇🏻• ───────≺\n🏰🏰🏰 Hiện tại có %1 lệnh có thể sử dụng trên bot này\n🌟Sử dụng: "%2giupdo + tên lệnh" để biết cách sử dụng lệnh\n🤖Bot được điều hành bởi ThanhDieuTV.\n[💟]\nHelp Sẽ Tự Động Gỡ Sao 60S',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "≻──── •𝙏𝙝𝙖𝙣𝙝 𝘿𝙞𝙚𝙪• ────≺\n";
    
    for (var [name, value] of (commands)) {
      name += `\n⪼ Thuộc nhóm: ${value.config.commandCategory}\n⪼ Mô tả: ${value.config.description}\n⪼ Thời gian chờ: ${value.config.cooldowns}s`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `⟬${++i}⟭• ${item}\n\n`;
    const text = `◤______________________◥\n⊶ Trang (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\n⊶ Gõ: "${prefix}help <tên lệnh>" để biết thêm chi tiết về lệnh đó\n⊶ Hiện tại có ${arrayInfo.length} lệnh có thể sử dụng\n⊶ Dùng ${prefix}help <Số trang>`;
    return api.sendMessage(msg + text, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 60000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};