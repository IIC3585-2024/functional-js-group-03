const { readFile, writeFile } = require('fs');

// codigo de clases
const pipe = functions => data => {
    return functions.reduce((value, func) => func(value), data);
}

const tranformBoldAndItalic = str => str.replace(/\*\*\*(.*)\*\*\*/g, '<em><strong>$1</strong></em>');
const transformBold = str => str.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
const transformItalic = str => str.replace(/\*(.*)\*/g, '<em>$1</em>');

const transformp = str => {
    if (str === '') {
        return '';
    }
    return /^(#|\*{1,3}|_|\d+\.)\s*/.test(str) ? str : `<p>${str}</p>`;
};

const transformh6 = str => str.replace(/######\s*(.*)/g, '<h6>$1</h6>');
const transformh5 = str => str.replace(/#####\s*(.*)/g, '<h5>$1</h5>');
const transformh4 = str => str.replace(/####\s*(.*)/g, '<h4>$1</h4>');
const transformh3 = str => str.replace(/###\s*(.*)/g, '<h3>$1</h3>');
const transformh2 = str => str.replace(/##\s*(.*)/g, '<h2>$1</h2>');
const transformh1 = str => str.replace(/#\s*(.*)/g, '<h1>$1</h1>');

const encapsulateListBoolean = () => {
    let firstFounded = false;

    return {
        getFirstFounded: () => firstFounded,
        setFirstFounded: (value) => firstFounded = value,
    }
}

const transformOrderedListsCurry = (listBooleans) => {
    return (str) => {
        const orderedList = str.match(/(\d+\.)\s*(.*)/);
        if (orderedList && !listBooleans.getFirstFounded()) {
            listBooleans.setFirstFounded(true);
            return ["<ol>", `    <li>${orderedList[2]}</li>`];
        }
        else if (orderedList && listBooleans.getFirstFounded()) {
            return [`    <li>${orderedList[2]}</li>`];
        }
        else if (!orderedList && listBooleans.getFirstFounded()) {
            listBooleans.setFirstFounded(false);
            return ["</ol>", str];
        }
        return str;
    }
}

const transformUnorderedListsCurry = (listBooleans) => {
    return (str) => {
        if (typeof(str) !== 'string') {
            return str;
        }
        const unorderedList = str.match(/(\*{1,3}|-)\s*(.*)/);
        if (unorderedList && !listBooleans.getFirstFounded()) {
            listBooleans.setFirstFounded(true);
            return ["<ul>", `    <li>${unorderedList[2]}</li>`];
        }
        else if (unorderedList && listBooleans.getFirstFounded()) {
            return [`    <li>${unorderedList[2]}</li>`];
        }
        else if (!unorderedList && listBooleans.getFirstFounded()) {
            listBooleans.setFirstFounded(false);
            return ["</ul>", str];
        }
        return str;
    }
}

const transformOrderedLists = transformOrderedListsCurry(encapsulateListBoolean());
const transformUnorderedLists = transformUnorderedListsCurry(encapsulateListBoolean());


const convertMarkdownToHTML = (filePath, htmlFilePath) => {
    readFile(filePath, 'utf8', function(err, data) {
        if (err) throw err;
        const mdLines = data.split('\n')
            .flatMap((line) => {
            return pipe([
                tranformBoldAndItalic, transformBold, transformItalic,
                transformp,
                transformh6, transformh5, transformh4, transformh3, transformh2, transformh1,
                transformOrderedLists, transformUnorderedLists,
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