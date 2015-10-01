import heap from './heap';
import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400|PT+Sans" rel="stylesheet" type="text/css">
  <meta name="viewport" content="initial-scale=1,user-scalable=no" />
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import React from 'react';
import Markdown from './markdown';
import Watchmaker from './watchmaker';

const src = document.querySelector('noscript');
React.render(
  <Markdown src={src.innerText || src.innerHTML} className={src.className}>
    <Watchmaker />
  </Markdown>,
  document.body
);
