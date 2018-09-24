"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var figlet_1 = require("figlet");
var VersionHandler = /** @class */ (function () {
    function VersionHandler() {
    }
    VersionHandler.prototype.handle = function () {
        console.log(chalk_1.default.blue(figlet_1.textSync('FDEV', {
            horizontalLayout: 'full'
        })));
        console.log(chalk_1.default.green("Fdev CLI:  " + JSON.stringify(require('../package.json').version).substr(1).slice(0, -1) + "\nNode:      " + process.version.substr(1) + "\nOS:        " + process.platform + " " + process.arch));
        process.exit();
    };
    return VersionHandler;
}());
exports.versionHandler = new VersionHandler();
