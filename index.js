import normalize from 'normalize.css';
import css from './index.css';

import marked from 'marked';

marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
pre.outerHTML = `<div class="container">${marked(pre.innerHTML)}</div>`;

document.title = 'waffle.js';

const fonts = document.createElement('link');
fonts.href = 'http://fonts.googleapis.com/css?family=Lato|Alegreya:700';
fonts.rel = 'stylesheet';
fonts.type = 'text/css';
document.head.appendChild(fonts);
