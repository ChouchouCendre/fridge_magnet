import React, { PureComponent } from 'react';
import 'pretty-checkbox/src/pretty-checkbox.scss';

import { productsFR } from './products';

class Todo extends PureComponent {

  renderTodo() {
    return (
      this.props.words.map((item, index) => (
        <div key={index}>
          {/*
          <label htmlFor={index}>
            <input type="checkbox" id={index} />{this.decodeId(item)}
          </label>
          */}
          {/* TMP */}
          <div className="todo-item pretty p-icon p-smooth">
          <input type="checkbox" />
          <div className="state p-success">
              <i className="icon fa fa-check"></i>
              <label>{this.decodeId(item)}</label>
          </div>
    </div>
          {/* END TMP */}
        </div>
      ))
    );
  }

  decodeId(id) {
    return productsFR[id];
  }

  render() {
    console.log(this.props);
    return (
      this.renderTodo()
    );
  }
}

export default Todo;
