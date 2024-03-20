const { readFile, writeFile } = require('fs');

// codigo de clases
const pipe = functions => data => {
    return functions.reduce((value, func) => func(value), data);
}

const tranformBoldAndItalic = str => str.replace(/\*\*\*(.*)\*\*\*/g, '<em><strong>$1</strong></em>');
const transformBold = str => str.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
const transformItalic = str => str.replace(/\*(.*)\*/g, '<em>$1</em>');

const transformp = str => /^(#|\*{1,3}|_|\d+\.)\s*/.test(str) ? str : `<p>${str}</p>`;

const transformh6 = str => str.replace(/######\s*(.*)/g, '<h6>$1</h6>');
const transformh5 = str => str.replace(/#####\s*(.*)/g, '<h5>$1</h5>');
const transformh4 = str => str.replace(/####\s*(.*)/g, '<h4>$1</h4>');
const transformh3 = str => str.replace(/###\s*(.*)/g, '<h3>$1</h3>');
const transformh2 = str => str.replace(/##\s*(.*)/g, '<h2>$1</h2>');
const transformh1 = str => str.replace(/#\s*(.*)/g, '<h1>$1</h1>');



const convertMarkdownToHTML = (filePath, htmlFilePath) => {
    readFile(filePath, 'utf8', function(err, data) {
        if (err) throw err;
        const mdLines = data.split('\n')
            .filter((line) => line === '' ? false : true)
            .map((line) => {
            return pipe([
                tranformBoldAndItalic, transformBold, transformItalic,
                transformp,
                transformh6, transformh5, transformh4, transformh3, transformh2, transformh1,
            ])(line);
        })
            .map((line) => {
            return '    ' + line;
        });
        const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
${mdLines.join('\n')}
</body>
</html>
        `
        writeFile(htmlFilePath, htmlContent, function(err) {
            if (err) throw err;
            console.log('The file has been saved!');
    });
})};

convertMarkdownToHTML('test.md', 'test.html');