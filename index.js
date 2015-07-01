import heap from './heap';
import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href="http://fonts.googleapis.com/css?family=PT+Sans|Roboto+Mono:400,700" rel="stylesheet" type="text/css">
  <meta name="viewport" content="initial-scale=1" />
  <title>WaffleJS</title>
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import marked from 'marked';
marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
const src = marked(pre.innerHTML).split('<hr>');
pre.outerHTML = `<header><div>${src[0]}</div></header><aside><div>${src[1]}</div></aside>`;
