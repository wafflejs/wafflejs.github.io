import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
  <meta name="viewport" content="initial-scale=1" />
  <title>WaffleJS</title>
  <link rel="icon" type="image/png" href="favicon.png" sizes="16x16">
  <link rel="icon" type="image/png" href="favicon@2x.png" sizes="32x32">
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import marked from 'marked';
marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
const src = marked(pre.innerHTML).split('<hr>');
pre.outerHTML = `<header><div>${src[0]}</div></header><aside><div>${src[1]}</div></aside>`;
