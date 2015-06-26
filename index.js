import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href="http://fonts.googleapis.com/css?family=Lato|Alegreya:700" rel="stylesheet" type="text/css" />
  <meta name="viewport" content="initial-scale=1" />
  <title>waffle.js</title>
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import marked from 'marked';
marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
const src = marked(pre.innerHTML).split('<hr>');
pre.outerHTML = `<header>${src[0]}</header><aside><div>${src[1]}</div></aside>`;
