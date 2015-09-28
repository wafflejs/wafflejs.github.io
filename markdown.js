import React from 'react';
import marked from 'marked';
import cx from 'classnames';
import css from './markdown.css';

marked.setOptions({ smartypants: true });

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: marked(props.src).split('<hr>')
    };
  }

  render() {
    const src = this.state.src;
    const classes = cx('markdown', this.props.className);
    return (
      <div className={classes}>
        <header><div dangerouslySetInnerHTML={{__html: src[0] }} /></header>
        <aside>
          <div dangerouslySetInnerHTML={{__html: src[1] }} />
          {this.props.children}
        </aside>
      </div>
    );
  }
}

export default Markdown;
