"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function readJsonFromFile(filename) {
    var rawData = fs_1.default.readFileSync(filename, 'utf-8');
    return JSON.parse(rawData);
}
var data = readJsonFromFile('test/data.json');
console.log(data);
