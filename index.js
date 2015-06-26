import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href="http://fonts.googleapis.com/css?family=Lato:400,700|Alegreya:700" rel="stylesheet" type="text/css" />
  <meta name="viewport" content="initial-scale=1" />
  <title>waffle.js</title>
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import marked from 'marked';
marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
pre.outerHTML = `<div>${marked(pre.innerHTML)}</div>`;
