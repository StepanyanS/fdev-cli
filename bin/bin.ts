#!/usr/bin/env node

const [, , ...args]: string[] = process.argv;

switch(args[0]) {
    case 'version':
    case '-v':
        import('../commands/version.handler').then(m => {
            m.versionHandler.handle();
        });
        break;
    case 'new':
    case 'n':
        import('../commands/new.handler').then(m => {
            m.newHandler.handle(args[1], args[2]);
        });
        break;
    case 'generate':
    case 'g':
        import('../commands/generate.handler').then(m => {
            m.generateHandler.handle(args[1], args[2]);
        });
        break;
    case 'integrate':
    case 'i':
        import ('../commands/integrate.handler').then(m => {
            m.integrateHandler.handle(args[1]);
        });
        break;
    case 'help':
    case '-h':
        import('../commands/help.handler').then(m => {
            m.helpHandler.handle();
        });
        break;
    case undefined:
        import('../commands/undefined.handler').then(m => {
            m.undefinedHandler.handle();
        });
        break;
    default:
        import('../commands/error.handler').then(m => {
            m.errorHandler.handle(args[0]);
        });
}