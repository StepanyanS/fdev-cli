const fs = require('fs');
const chalk = require('chalk');

function fileExists(filename) {
    try {
      return fs.statSync(filename).isFile();
    } catch (err) {
      return false;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getModuleData(moduleFile) {
    let data = fs.readFileSync(moduleFile, { encoding: 'utf-8' });
    data = data.replace(/(\r\n|\n|\r|\s)/gm,"");
    const strStart = data.indexOf('[');
    const strEnd = data.indexOf(']');
    return data.slice(strStart + 1, strEnd);
}

function writeData(moduleFile, moduleData, file) {
    let data = getModuleData(moduleFile);
    if(data.length === 0) {
        let writeData = `${moduleData[0]}\t'${file}'${moduleData[1]}`;
        fs.writeFileSync(moduleFile, writeData);
    }
    else {
        data = data.split('\'').filter((item) => {
            return item !== ',' && item !== '' && item !== '//' && item !== ',//'
        });
        let writeData = `${moduleData[0]}`;
        data.forEach(item => writeData +=`\t'${item}',\n`);
        writeData += `\t'${file}'${moduleData[1]}`
        fs.writeFileSync(moduleFile, writeData);
    }
}

function generateComponent(component) {
    if(fileExists(`components/${component}.component.html`)) {
        console.log(chalk.red(`Component "${component}" is already exist.`));
        process.exit();
    }
    else {
        const writeData = `<p>${capitalize(component)} works!</p>`;
        fs.writeFileSync(`components/${component}.component.html`, writeData, (error) => {
            if(error) console.log(error);
        });
        updateProvider('component', component);
        console.log(chalk.green('Create'), `components/${component}.html`);
        console.log(chalk.blue('Update'), 'components/components.js');
    }
}

function generatePage(page) {
    if(fileExists(`pages/${page}.html`)) {
        console.log(chalk.red(`Page "${page}" is already exist.`));
    }
    else {
        const writeData = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${capitalize(page)}</title>
</head>
<body>

    <h1>${capitalize(page)} works!</h1>
    
</body>
</html>`;
        fs.writeFileSync(`pages/${page}.html`, writeData, (error) => {
            if(error) console.log(error);
        });
        updateProvider('page', page);
        console.log(chalk.green('Create'), `pages/${page}.html`);
        console.log(chalk.blue('Update'), 'pages/pages.js');
    }
}

function updateProvider(type, file) {
    if(type === 'component') {
        const moduleFile = 'components/components.js';
        const moduleData = ['const components = [\n', '\n];\n\nmodule.exports = components;'];
        writeData(moduleFile, moduleData, file);
    }
    else if(type === 'page') {
        const moduleFile = 'pages/pages.js';
        const moduleData = ['const pages = [\n', '\n];\n\nexport default pages;'];
        writeData(moduleFile, moduleData, file);
    }
}

function generateHandler(generateType, generateFile) {
    if(generateType === 'component' || generateType === 'c') {
        generateComponent(generateFile);
    }
    
    else if(generateType === 'page' || generateType === 'p') {
        generatePage(generateFile);
    }

    else {
        console.log(chalk.red(`"${generateType}" isn't a schematic for "generate" command. For a list of available options, run "fdev help".`));
    }
    process.exit();
}

module.exports = generateHandler;