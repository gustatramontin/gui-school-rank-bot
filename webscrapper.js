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
var puppeteer = require("puppeteer");
function getGrades(matricula, birthday) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, name, grades, subjectsExcluded, _i, subjectsExcluded_1, subject, mean;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("http://www.sge8147.com.br/hlogin.aspx")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.click("#span_MMODNOMEXIBICAO_0001")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.waitForNavigation()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.type("#_ALUMATP", matricula)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.type("#_ALUDATNASP", birthday)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.press("Enter")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.click("input[name=PESQUISAR]")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.waitForNavigation()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, page.click("#span__SECNUMSTR_0001")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, page.waitForNavigation()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var name = document.querySelector("#span_W0008_ALUNOM");
                            return name.innerText;
                        })];
                case 13:
                    name = _a.sent();
                    page.click("#W0008TEXTBLOCK21");
                    return [4 /*yield*/, page.waitForNavigation()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var grades = {};
                            for (var i = 1; i <= 9; i++) {
                                var subjectEl = document.querySelector("#span_W0029_DISNOM_000" + i);
                                var gradeEl1T = document.querySelector("#span_W0029_NT1C_000" + i);
                                var gradeEl2T = document.querySelector("#span_W0029_NT2C_000" + i);
                                grades[subjectEl.innerText] = (Number(gradeEl1T.innerText) + Number(gradeEl2T.innerText)) / 2;
                            }
                            return grades;
                        })];
                case 15:
                    grades = _a.sent();
                    console.log(name);
                    return [4 /*yield*/, browser.close()];
                case 16:
                    _a.sent();
                    subjectsExcluded = ['ENSINO RELIGIOSO', 'HISTÓRIA', 'EDUCACAO FÍSICA'];
                    for (_i = 0, subjectsExcluded_1 = subjectsExcluded; _i < subjectsExcluded_1.length; _i++) {
                        subject = subjectsExcluded_1[_i];
                        delete grades[subject];
                    }
                    mean = Object.values(grades).reduce(function (total, current) { return total + current; }) / Object.values(grades).length;
                    console.log(grades);
                    return [2 /*return*/, { "name": name, "mean": mean }];
            }
        });
    });
}
if (require.main === module) {
    getGrades("1400037228", "27/06/2007");
}
module.exports = getGrades;
