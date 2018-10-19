#!/usr/bin/env node
var _a = process.argv, args = _a.slice(2);
switch (args[0]) {
    case 'version':
    case '-v':
        Promise.resolve().then(function () { return require('../commands/version.handler'); }).then(function (m) {
            m.versionHandler.handle();
        });
        break;
    case 'new':
    case 'n':
        Promise.resolve().then(function () { return require('../commands/new.handler'); }).then(function (m) {
            m.newHandler.handle(args[1], args[2]);
        });
        break;
    case 'generate':
    case 'g':
        Promise.resolve().then(function () { return require('../commands/generate.handler'); }).then(function (m) {
            m.generateHandler.handle(args[1], args[2]);
        });
        break;
    case 'integrate':
    case 'i':
        Promise.resolve().then(function () { return require('../commands/integrate.handler'); }).then(function (m) {
            m.integrateHandler.handle(args[1]);
        });
        break;
    case 'help':
    case '-h':
        Promise.resolve().then(function () { return require('../commands/help.handler'); }).then(function (m) {
            m.helpHandler.handle();
        });
        break;
    case undefined:
        Promise.resolve().then(function () { return require('../commands/undefined.handler'); }).then(function (m) {
            m.undefinedHandler.handle();
        });
        break;
    default:
        Promise.resolve().then(function () { return require('../commands/error.handler'); }).then(function (m) {
            m.errorHandler.handle(args[0]);
        });
}
