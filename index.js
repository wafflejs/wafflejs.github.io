import heap from './heap';
import normalize from 'normalize.css';
import css from './index.css';

const head = document.createElement('div');
head.innerHTML = `
  <link href="http://fonts.googleapis.com/css?family=Roboto+Mono:500|PT+Sans" rel="stylesheet" type="text/css">
  <meta name="viewport" content="initial-scale=1" />
  <title>WaffleJS</title>
`;
while (head.childNodes.length)
  document.head.appendChild(head.childNodes[0]);

import React from 'react';
import Markdown from './markdown';

React.render(
  <main>
    <Markdown>{document.querySelector('noscript').innerHTML}</Markdown>
  </main>,
  document.body
);
