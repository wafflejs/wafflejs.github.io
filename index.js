import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
  <meta name="viewport" content="initial-scale=1" />
  <title>WaffleJS</title>
  <link rel="icon" type="image/png" href="favicon.png">
  <meta property="og:title" content="WaffleJS" />
  <meta property="og:description" content="A fun meetup for people who like waffles and technology." />
  <meta property="og:image" content="social.png" />
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import marked from 'marked';
marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
const src = marked(pre.innerHTML).split('<hr>');
pre.outerHTML = `<header><div>${src[0]}</div></header><aside><div>${src[1]}</div></aside>`;
