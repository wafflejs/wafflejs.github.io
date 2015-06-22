import normalize from 'normalize.css';
import css from './index.css';

import marked from 'marked';

marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
pre.outerHTML = `<div class="container">${marked(pre.innerHTML)}</div>`;
