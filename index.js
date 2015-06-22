import marked from 'marked';

marked.setOptions({ smartypants: true });

const pre = document.querySelector('pre');
pre.outerHTML = marked(pre.innerHTML);
