"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var webscrapper_1 = __importDefault(require("../webscrapper"));
var db_1 = __importDefault(require("./db"));
var client = new discord_js_1.Client();
var DiscordCommands = require('@gtramontin/discord-commands');
var bot = new DiscordCommands.bot('grades', client, {
    acceptBot: false
});
var Database = new db_1.default();
var token = require('./config.json').token;
client.on('ready', function () {
    console.log("Logged in as client.user.tag!");
});
bot.command('ping', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, msg.channel.send('pong 🏓')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command('add', function (msg, matricula, nascimento) { return __awaiter(void 0, void 0, void 0, function () {
    var matriculaRegex, nascimentoRegex, data, emoji;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                matriculaRegex = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/i;
                nascimentoRegex = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/i;
                if (!matriculaRegex.test(matricula)) {
                    msg.channel.send(msg.author.toString() + " voc\u00EA digitou a matricula da forma errada!");
                    return [2 /*return*/];
                }
                if (!nascimentoRegex.test(nascimento)) {
                    msg.channel.send(msg.author.toString() + " voc\u00EA digitou a data de nascimento da forma errada!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, webscrapper_1.default(matricula, nascimento)];
            case 1:
                data = _a.sent();
                Database.addGrade(data.name, data.mean);
                if (data.mean >= 8)
                    emoji = "😱";
                else if (data.mean == 7)
                    emoji = "😑";
                else
                    emoji = "😒";
                msg.channel.send("A m\u00E9dia de " + data.name + " \u00E9 " + data.mean + " " + emoji);
                return [2 /*return*/];
        }
    });
}); });
bot.command('show', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var grades, message, _i, _a, name_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                grades = Database.getGrades();
                message = "";
                for (_i = 0, _a = Object.keys(grades); _i < _a.length; _i++) {
                    name_1 = _a[_i];
                    message += name_1 + " -> " + grades[name_1].toFixed(2) + "\n";
                }
                return [4 /*yield*/, msg.channel.send(message)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
/*
bot.command('move', async (msg: any, channel_name: any, person: any) => {

    const channel = await client.channels.fetch(channel_name)

    console.log(person)

    const fetchUser = await client.users.fetch(person.slice(3, -1))

    fetchUser.voice.setChannel(channel)

})*/
bot.command('rebot', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, msg.channel.send('accept bot')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command('say-my-name', function (msg, name, lastName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, msg.channel.send("Hello " + name + " " + lastName)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command('', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var message, numberOfUppercases, maxPercentageOfUppercase;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (msg.author.bot)
                    return [2 /*return*/];
                message = msg.content;
                numberOfUppercases = message.split('').reduce(function (total, current) {
                    if (current === current.toUpperCase() && ![1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(Number(current))) {
                        return total + 1;
                    }
                    return total;
                }, 0);
                maxPercentageOfUppercase = 0.8 // 80%
                ;
                if (!(numberOfUppercases / message.length >= maxPercentageOfUppercase)) return [3 /*break*/, 3];
                return [4 /*yield*/, msg.delete({
                        timeout: 500
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, msg.channel.send(msg.author.toString() + " proibido spam!")];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
client.login(token);
