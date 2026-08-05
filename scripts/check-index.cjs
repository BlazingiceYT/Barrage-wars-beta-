const { readFileSync } = require('fs');
const { Script } = require('vm');

const html = readFileSync('index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) {
  throw new Error('No inline game script found in index.html');
}

new Script(match[1], { filename: 'index.html:inline-script' });
