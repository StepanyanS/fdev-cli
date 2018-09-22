"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var UndefinedHandler = /** @class */ (function () {
    function UndefinedHandler() {
    }
    UndefinedHandler.prototype.handle = function () {
        console.log(chalk_1.default.red("You must specify command. For a list of available commands, run \"fdev help\" or \"fdev -h\"."));
        process.exit();
    };
    return UndefinedHandler;
}());
exports.undefinedHandler = new UndefinedHandler();
