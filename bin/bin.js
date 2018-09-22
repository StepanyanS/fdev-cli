#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var version_handler_1 = require("./../commands/version.handler");
var help_handler_1 = require("./../commands/help.handler");
var error_handler_1 = require("../commands/error.handler");
var generate_handler_1 = require("../commands/generate.handler");
var new_handler_1 = require("./../commands/new.handler");
var undefined_handler_1 = require("./../commands/undefined.handler");
var _a = process.argv, args = _a.slice(2);
switch (args[0]) {
    case 'version':
    case '-v':
        version_handler_1.versionHandler.handle();
        break;
    case 'new':
        new_handler_1.newHandler.handle(args[1], args[2]);
        break;
    case 'generate':
    case 'g':
        generate_handler_1.generateHandler.handle(args[1], args[2]);
        break;
    case 'help':
    case '-h':
        help_handler_1.helpHandler.handle();
        break;
    case undefined:
        undefined_handler_1.undefinedHandler.handle();
        break;
    default:
        error_handler_1.errorHandler.handle(args[0]);
}
