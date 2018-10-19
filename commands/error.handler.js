"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.handle = function (arg) {
        console.log(chalk_1["default"].red("The specified command (\"" + arg + "\") is invalid. For a list of available options, run \"fdev help\"."));
        process.exit();
    };
    return ErrorHandler;
}());
exports.errorHandler = new ErrorHandler();
