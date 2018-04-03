import React, { Component } from 'react';
import 'pretty-checkbox/src/pretty-checkbox.scss';

import { productsFR, productsEN } from './products';
import Labels from './labels.json';
import Global from './global';

class Todo extends Component {

  renderTodo() {
    if (this.props.wordsID.length === 0) {
      return (
      <div className="todo-empty">{ Labels[this.props.lang].empty }<br /><br /><img src={`${Global.pathImg}homer.gif`} width="300" /></div>
      );
    }
    return (
      this.props.wordsID.map(item => (
        <div key={item} data-id={item}>
          <div className="todo-item pretty p-icon p-smooth">
          <input type="checkbox" />
            <div className="state p-success">
                <i className="icon fa fa-check"></i>
                <label>{this.decodeId(item)}</label>
            </div>
          </div>
        </div>
      ))
    );
  }

  decodeId(id) {
    return this.props.lang === 'fr' ? productsFR[id] : productsEN[id];
  }

  render() {
    return (
      this.renderTodo()
    );
  }
}

export default Todo;
