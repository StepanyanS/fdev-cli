"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var HelpHandler = /** @class */ (function () {
    function HelpHandler() {
    }
    HelpHandler.prototype.handle = function () {
        console.log('Available Commands');
        console.log('  ', chalk_1["default"].blue('new | n'), 'Generates new project with given name');
        console.log('  ', chalk_1["default"].blue('generate | g'), 'Generates files based on a schematic.');
        console.log('  ', chalk_1["default"].blue('integrate | i'), 'integrates Icomoon into project');
        process.exit();
    };
    return HelpHandler;
}());
exports.helpHandler = new HelpHandler();
