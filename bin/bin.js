#!/usr/bin/env node
var _a = process.argv, args = _a.slice(2);
if (args[0] === 'version' || args[0] === '-v') {
    Promise.resolve().then(function () { return require('../commands/version'); }).then(function (m) {
        m.versionHandler.handle();
    });
}
else if (args[0] === 'new') {
    Promise.resolve().then(function () { return require('../commands/new'); }).then(function (m) {
        m.newHandler.handle(args[1], args[2]);
    });
}
else if (args[0] === 'generate' || args[0] === 'g') {
    Promise.resolve().then(function () { return require('../commands/generate'); }).then(function (m) {
        m.generateHandler.handle(args[1], args[2]);
    });
}
else if (args[0] === 'help' || args[0] === '-h') {
    Promise.resolve().then(function () { return require('../commands/help'); }).then(function (m) {
        m.helpHandler.handle();
    });
}
else {
    Promise.resolve().then(function () { return require('../commands/error'); }).then(function (m) {
        m.errorHandler.handle(args[0]);
    });
}
