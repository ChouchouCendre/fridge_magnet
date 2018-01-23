import React, { PureComponent } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { CSVLink } from 'react-csv';

import Labels from './labels.json';

class Toolbar extends PureComponent {

  constructor(props) {
    super(props);
    this.clickClearTodo = this.clickClearTodo.bind(this);
    this.clickSendMail = this.clickSendMail.bind(this);
  }

  clickClearTodo() {
    this.props.onClear();
  }

  clickSendMail() {
    const mailSubject = encodeURIComponent(Labels[this.props.lang].mailSubject);
    const courses = encodeURIComponent(`— ${this.props.labels.join('\n— ')}`);
    window.open(`mailto:?subject=${mailSubject}&body=${courses}`, '_self');
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
        <CSVLink data={this.props.labels} filename={ Labels[this.props.lang].csvFile } >
        <Tooltip
        title={ Labels[this.props.lang].csv }
        animation="perspective"
        ><i className="fa fa-file-excel-o" aria-hidden="true"></i></Tooltip></CSVLink>
        <span onClick={ this.clickSendMail }>
        <Tooltip
        title={ Labels[this.props.lang].mail }
        animation="perspective"
        ><i className="fa fa-share" aria-hidden="true"></i></Tooltip>
        </span>
      </div>
    );
  }
}

export default Toolbar;
