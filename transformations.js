const {
  headingPatterns,
  emphasisPatterns,
  listsPatterns,
  linkPattern,
  imagePattern,
  codePattern,
  codeBlockPattern,
  paragraphPattern,
} = require('./patterns');

const transformHeadings = (markdown) =>
  markdown.replace(headingPatterns.regex, (_, hashes, text) =>
    headingPatterns.html(hashes, text),
  );

const transformEmphasis = (markdown) => {
  let transformedMarkdown = markdown;
  Object.keys(emphasisPatterns).forEach((key) => {
    const { regex, html } = emphasisPatterns[key];
    transformedMarkdown = transformedMarkdown.replace(regex, html);
  });
  return transformedMarkdown;
};

const transformLists = (markdown) => {
  Object.values(listsPatterns).forEach((pattern) => {
    markdown = markdown.replace(pattern.regex, (block) => {
      return pattern.html(block);
    });
  });
  return markdown;
};

const createTransformer = (pattern) => (markdown) =>
  markdown.replace(pattern.regex, pattern.html);
const transformLinks = createTransformer(linkPattern);
const transformImages = createTransformer(imagePattern);
const transformCode = createTransformer(codePattern);
const transformCodeBlock = createTransformer(codeBlockPattern);
const transformParagraph = createTransformer(paragraphPattern);

const transformations = [
  transformHeadings,
  transformEmphasis,
  transformLists,
  transformImages,
  transformLinks,
  transformCodeBlock,
  transformCode,
  transformParagraph,
];

module.exports = { transformations };
