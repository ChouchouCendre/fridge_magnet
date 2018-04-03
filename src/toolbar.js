import React, { PureComponent } from 'react';
// import { CSVLink } from 'react-csv';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Labels from './labels.json';
import { productsFR, productsEN } from './products';

class Toolbar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false,
      labelCopy: Labels[this.props.lang].copyPaste,
    };
    this.clickClearTodo = this.clickClearTodo.bind(this);
    this.clickSendMail = this.clickSendMail.bind(this);
    this.clickCopyPaste = this.clickCopyPaste.bind(this);
    // this.clickCopyPaste();
  }

  componentDidUpdate() {
    let clipboard = '';
    console.log('this.props.wordsID', this.props.wordsID);
    this.props.wordsID.map(item => clipboard += `${this.decodeId(item)}\n`);
    // this.setState({ clipboard }, this.copied);
    this.setState({ value: clipboard });
  }

  clickClearTodo() {
    this.props.onClear();
  }

  clickSendMail() {
    const mailSubject = encodeURIComponent(Labels[this.props.lang].mailSubject);
    const courses = encodeURIComponent(`— ${this.props.labels.join('\n— ')}`);
    window.open(`mailto:?subject=${mailSubject}&body=${courses}`, '_blank');
  }

  clickCopyPaste() {
    let clipboard = '';
    this.props.wordsID.map(item => (
      clipboard += `${this.decodeId(item)}\n`
    ));
    // this.setState({ clipboard }, this.copied);
    console.log('clipboard', clipboard);
    this.setState({ value: clipboard });
  }

  copied() {
    const copyText = document.querySelector('.clipboard');
    copyText.select();
    document.execCommand('Copy');
  }

  decodeId(id) {
    return this.props.lang === 'fr' ? productsFR[id] : productsEN[id];
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="todo-toolbar">
        <div onClick={ this.clickClearTodo }>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
          <span>{ Labels[this.props.lang].clear }</span>
        </div>
        {/*
        <CSVLink data={this.props.labels} filename={ Labels[this.props.lang].csvFile } >
        <Tooltip
        title={ Labels[this.props.lang].csv }
        animation="perspective"
        ><i className="fa fa-file-excel-o" aria-hidden="true"></i></Tooltip></CSVLink>
        */}

        {/* {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null} */}

        <div onClick={ this.clickCopyPaste }>
          <CopyToClipboard text={ this.state.value }
          onCopy={() => this.setState({ labelCopy: Labels[this.props.lang].copied })}>
          <i className="fa fa-clipboard" aria-hidden="true"></i>
          </CopyToClipboard>
          <span>{ this.state.labelCopy }</span>
        </div>
        <div onClick={ this.clickSendMail }>
          <i className="fa fa-share" aria-hidden="true"></i>
          <span>{ Labels[this.props.lang].mail }</span>
          </div>
        <input className="clipboard" value={this.state.value}
          onChange={({ target: { value } }) => this.setState({ value, copied: false })} />
        {/*
        <textarea className="clipboard" value={ this.state.clipboard } onChange={ this.handleChange }></textarea>
        */}
      </div>
    );
  }
}

export default Toolbar;
