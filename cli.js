#!/usr/bin/env node

// import argv handlers
const argvHandlers = require('./lib/argv-handlers');

const [, , ...args] = process.argv;

if(args[0] === '-v') {
    argvHandlers.versionhandler();
}

else if(args[0] === 'generate' || args[0] === 'g') {
    argvHandlers.generateHandler(args[1], args[2]);
}
else if(args[0] === 'help') {
    argvHandlers.helpHandler();
}
else {
    argvHandlers.errorHandler();
}