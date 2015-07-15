import heap from './heap';
import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href="http://fonts.googleapis.com/css?family=PT+Sans:400, 700" rel="stylesheet" type="text/css">
  <link href="http://fonts.googleapis.com/css?family=Roboto+Mono:400" rel="stylesheet" type="text/css">
  <meta name="viewport" content="initial-scale=1" />
  <title>WaffleJS</title>
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import marked from 'marked';
marked.setOptions({ smartypants: true });

const content = document.querySelector('noscript');
const src = marked(content.innerHTML).split('<hr>');
content.outerHTML = `<header><div>${src[0]}</div></header><aside><div>${src[1]}</div></aside>`;
