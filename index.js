import normalize from 'normalize.css';
import css from './index.css';

import marked from 'marked';

marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
pre.outerHTML = `<div>${marked(pre.innerHTML)}</div>`;

document.title = 'waffle.js';

const fonts = document.createElement('link');
fonts.href = 'http://fonts.googleapis.com/css?family=Lato:400,700|Alegreya:700';
fonts.rel = 'stylesheet';
fonts.type = 'text/css';
document.head.appendChild(fonts);

const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'initial-scale=1';
document.head.appendChild(viewport);
