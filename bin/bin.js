#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var version_1 = require("./../commands/version");
var help_1 = require("./../commands/help");
var error_1 = require("../commands/error");
var generate_1 = require("../commands/generate");
var new_1 = require("./../commands/new");
var _a = process.argv, args = _a.slice(2);
if (args[0] === 'version' || args[0] === '-v') {
    version_1.versionHandler.handle();
}
else if (args[0] === 'new') {
    new_1.newHandler.handle(args[1]);
}
else if (args[0] === 'generate' || args[0] === 'g') {
    generate_1.generateHandler.handle(args[1], args[2]);
}
else if (args[0] === 'help' || args[0] === '-h') {
    help_1.helpHandler.handle();
}
else {
    error_1.errorHandler.handle(args[0]);
}
