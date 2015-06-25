import React from 'react';
import marked from 'marked';

marked.setOptions({ smartypants: true });

class Markdown extends React.Component {
  render() {
    const src = marked(this.props.children.toString()).split('<hr>');
    return (
      <div className="markdown">
        <header><div dangerouslySetInnerHTML={{__html: src[0] }} /></header>
        <aside><div dangerouslySetInnerHTML={{__html: src[1] }} /></aside>
      </div>
    );
  }
}

export default Markdown;
