import React from 'react';
import Watchmaker from './watchmaker';
import marked from 'marked';
import css from './markdown.css';

marked.setOptions({ smartypants: true });

class Markdown extends React.Component {
  render() {
    const src = marked(this.props.children.toString()).split('<hr>');
    return (
      <div className="markdown">
        <header><div dangerouslySetInnerHTML={{__html: src[0] }} /></header>
        <aside>
          <div dangerouslySetInnerHTML={{__html: src[1] }} />
          <Watchmaker />
        </aside>
      </div>
    );
  }
}

export default Markdown;
