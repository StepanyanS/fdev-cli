// import "path" plugin
import path from 'path';

// import "chokidar" plugin
import chokidar from 'chokidar';

// import cursor
import cursor from './lib/cursor';

// import RequirePages class
import RequirePages from './requirePages';

// import RequireComponents
import RequireComponents from './requireComponents';

// define components file path
const componentsFile = path.resolve(__dirname, '../src/components/components.js');

cursor.green();

new RequirePages();
new RequireComponents();

// Turn on chokidar watch in development
let nodeENV = 'development';
if(process.env.NODE_ENV) {
    nodeENV = process.env.NODE_ENV.trim();
}

if(nodeENV === 'development') {

    // chokidar watches components file for changes and refreshes components module file in development
    chokidar.watch(componentsFile).on('change', () => {
        new RequireComponents();
    });
}

cursor.reset();