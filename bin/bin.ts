#!/usr/bin/env node

import { versionHandler } from './../commands/version.handler';
import { helpHandler } from './../commands/help.handler';
import { errorHandler } from '../commands/error.handler';
import { generateHandler } from '../commands/generate.handler';
import { newHandler } from './../commands/new.handler';
import { undefinedHandler } from './../commands/undefined.handler';

const [, , ...args]: string[] = process.argv;

switch(args[0]) {
    case 'version':
    case '-v':
        versionHandler.handle();
        break;
    case 'new':
        newHandler.handle(args[1], args[2]);
        break;
    case 'generate':
    case 'g':
        generateHandler.handle(args[1], args[2]);
        break;
    case 'help':
    case '-h':
        helpHandler.handle();
        break;
    case undefined:
        undefinedHandler.handle();
        break;
    default:
        errorHandler.handle(args[0]);
}