const fs = require('fs').promises;

const pipe =
  (...functions) =>
  (input) =>
    functions.reduce((acc, func) => func(acc), input);

const saveToHTML = async (htmlContent, outputFilename = 'result.html') => {
  try {
    await fs.writeFile(outputFilename, htmlContent, 'utf-8');
    console.log(`El resultado fue guardado en el archivo ${outputFilename}`);
  } catch (error) {
    console.error(`Hubo un error guardado el resultado: ${error}`);
    throw error;
  }
};

const readMarkdownFile = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { pipe, saveToHTML, readMarkdownFile };
