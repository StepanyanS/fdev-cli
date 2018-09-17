#!/usr/bin/env node

const [, , ...args]: string[] = process.argv;

if(args[0] === 'version' || args[0] === '-v') {
    import('../commands/version').then(m => {
        m.versionHandler.handle();
    });
}
else if(args[0] === 'new') {
    import('../commands/new').then(m => {
        m.newHandler.handle(args[1], args[2]);
    })
}
else if(args[0] === 'generate' || args[0] === 'g') {
    import('../commands/generate').then(m => {
        m.generateHandler.handle(args[1], args[2]);
    });
}
else if(args[0] === 'help' || args[0] === '-h') {
    import('../commands/help').then(m => {
        m.helpHandler.handle();
    });
}
else {
    import('../commands/error').then(m => {
        m.errorHandler.handle(args[0]);
    });
}