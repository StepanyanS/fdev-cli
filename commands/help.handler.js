"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var HelpHandler = /** @class */ (function () {
    function HelpHandler() {
    }
    HelpHandler.prototype.handle = function () {
        console.log('Available Commands');
        console.log('  ', chalk_1.default.blue('new'), 'Generates new project with given name');
        console.log('  ', chalk_1.default.blue('generate'), 'Generates files based on a schematic.');
        process.exit();
    };
    return HelpHandler;
}());
exports.helpHandler = new HelpHandler();
