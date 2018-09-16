#!/usr/bin/env node

import { versionHandler } from './../commands/version';
import { helpHandler } from './../commands/help';
import { errorHandler } from '../commands/error';
import { generateHandler } from '../commands/generate';
import { newHandler } from './../commands/new';

const [, , ...args]: string[] = process.argv;

if(args[0] === 'version' || args[0] === '-v') {
    versionHandler.handle();
}
else if(args[0] === 'new') {
    newHandler.handle(args[1], args[2]);
}
else if(args[0] === 'generate' || args[0] === 'g') {
    generateHandler.handle(args[1], args[2]);
}
else if(args[0] === 'help' || args[0] === '-h') {
    helpHandler.handle();
}
else {
    errorHandler.handle(args[0]);
}