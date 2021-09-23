"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var DB = /** @class */ (function () {
    function DB(file) {
        if (file === void 0) { file = "grades.json"; }
        this.fileName = file;
        this.data = this.read_db();
    }
    DB.prototype.read_db = function () {
        return require('../' + this.fileName);
    };
    DB.prototype.sortGrades = function () {
        var _this = this;
        var namesSortedByGrade = Object.keys(this.data).sort(function (a, b) { return _this.data[b] - _this.data[a]; });
        console.log(namesSortedByGrade);
        var gradesSorted = {};
        for (var _i = 0, namesSortedByGrade_1 = namesSortedByGrade; _i < namesSortedByGrade_1.length; _i++) {
            var name_1 = namesSortedByGrade_1[_i];
            gradesSorted[name_1] = this.data[name_1];
        }
        this.data = gradesSorted;
    };
    DB.prototype.save_db = function () {
        this.sortGrades();
        fs_1.default.writeFile(this.fileName, JSON.stringify(this.data), function (err) {
            if (err)
                throw err;
            console.log('Saved!');
        });
    };
    DB.prototype.addGrade = function (name, mean) {
        this.data[name] = mean;
        this.save_db();
    };
    DB.prototype.getGrade = function (name) {
        return this.data[name];
    };
    DB.prototype.getGrades = function () {
        return this.data;
    };
    return DB;
}());
exports.default = DB;
