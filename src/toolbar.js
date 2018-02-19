import React, { PureComponent } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { CSVLink } from 'react-csv';

import Labels from './labels.json';
import { productsFR, productsEN } from './products';

class Toolbar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      clipboard: '',
    };
    this.clickClearTodo = this.clickClearTodo.bind(this);
    this.clickSendMail = this.clickSendMail.bind(this);
    this.clickCopyPaste = this.clickCopyPaste.bind(this);
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
      clipboard += this.decodeId(item) + '\n'
    ))
    this.setState({ clipboard }, this.copied);
  }

  copied() {
    var copyText = document.querySelector(".clipboard");
    copyText.select();
    document.execCommand("Copy");
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
        <span onClick={ this.clickClearTodo }>
          <Tooltip
          title={ Labels[this.props.lang].clear }
          animation="perspective"
          ><i className="fa fa-trash-o" aria-hidden="true"></i></Tooltip>
        </span>
        {/*
        <CSVLink data={this.props.labels} filename={ Labels[this.props.lang].csvFile } >
        <Tooltip
        title={ Labels[this.props.lang].csv }
        animation="perspective"
        ><i className="fa fa-file-excel-o" aria-hidden="true"></i></Tooltip></CSVLink>
        */}
        <span onClick={ this.clickCopyPaste }>
        <Tooltip
        title={ Labels[this.props.lang].copyPaste }
        animation="perspective"
        ><i className="fa fa-clipboard" aria-hidden="true"></i></Tooltip>
        </span>
        <span onClick={ this.clickSendMail }>
        <Tooltip
        title={ Labels[this.props.lang].mail }
        animation="perspective"
        ><i className="fa fa-share" aria-hidden="true"></i></Tooltip>
        </span>
        <textarea className="clipboard" value={ this.state.clipboard } onChange={ this.handleChange }></textarea>
      </div>
    );
  }
}

export default Toolbar;
