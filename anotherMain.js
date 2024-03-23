const { pipe, readMarkdownFile, saveToHTML } = require('./utils');
const { transformations } = require('./transformations');

const convertMarkdownToHTML = async (filePath = 'test.md') => {
  const markdownContent = await readMarkdownFile(filePath);
  const processMarkdown = pipe(...transformations, saveToHTML);
  await processMarkdown(markdownContent);
};

convertMarkdownToHTML();
