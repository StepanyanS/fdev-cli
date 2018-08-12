#!/usr/bin/env node

// import argv handlers
const argvHandlers = require('./lib/argv-handlers');

if(process.argv.slice(2)[0] === '-v') {
    argvHandlers.versionhandler();
}

else if(process.argv.slice(2)[0] === 'generate' || process.argv.slice(2)[0] === 'g') {
    argvHandlers.generateHandler(process.argv.slice(2)[1], process.argv.slice(2)[2]);
}
else if(process.argv.slice(2)[0] === 'help') {
    argvHandlers.helpHandler();
}
else {
    argvHandlers.errorHandler();
}