const headingPatterns = {
  regex: /^(#+)\s*(.*)/gm,
  html: (hashes, text) => `<h${hashes.length}>${text}</h${hashes.length}>`,
};

const emphasisPatterns = {
  '**': {
    regex: /\*\*(.*)\*\*/g,
    html: '<strong>$1</strong>',
  },
  '__': {
    regex: /__(.*)__/g,
    html: '<strong>$1</strong>',
  },
  '*': {
    regex: /\*(.*)\*/g,
    html: '<em>$1</em>',
  },
  '_': {
    regex: /_(.*)_/g,
    html: '<em>$1</em>',
  },
  '***': {
    regex: /\*\*\*(.*)\*\*\*/g,
    html: '<em><strong>$1</strong></em>',
  },
  '___': {
    regex: /__(.*)__/g,
    html: '<em><strong>$1</strong></em>',
  },
  '**_': {
    regex: /\*\*_(.*)_\*\*/g,
    html: '<strong><em>$1</em></strong>',
  },
  '__*': {
    regex: /__(.*)__\*/g,
    html: '<strong><em>$1</em></strong>',
  },
};

const listsPatterns = {
  ul: {
    regex: /^(\s*[-*+]\s.*)+/gm,
    html: (block) => {
      const itemsHtml = block
        .trim()
        .split('\n')
        .map((item) => `<li>${item.trim().substring(1).trim()}</li>`)
        .join('');
      return `<ul>${itemsHtml}</ul>`;
    },
  }, 
  ol: {
    regex: /^(\s*\d+\.\s.*)+/gm,
    html: (block) => {
      const itemsHtml = block
        .trim()
        .split('\n')
        .map((item) => `<li>${item.trim().substring(2).trim()}</li>`)
        .join('');
      return `<ol>${itemsHtml}</ol>`;
    },
  },
};

const linkPattern = {
  regex: /\[(.*?)\]\((.*?)\)/g,
  html: '<a href="$2">$1</a>',
};

const imagePattern = {
  regex: /!\[(.*?)\]\((.*?)\)/g,
  html: '<img src="$2" alt="$1">',
};

const codePattern = {
  regex: /`([^`]+)`/g, 
  html: '<code>$1</code>',
};

const codeBlockPattern = {
  regex: /```(\w+)?\s*([\s\S]*?)```/g,
  html: '<pre><code>$2</code></pre>',
};

const paragraphPattern = {
  regex: /(.+)/g,
  html: '<p>$1</p>',
};

module.exports = {
  headingPatterns,
  emphasisPatterns,
  listsPatterns,
  linkPattern,
  imagePattern,
  codePattern,
  codeBlockPattern,
  paragraphPattern,
};
