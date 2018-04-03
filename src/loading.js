import React, { PureComponent } from 'react';
import Loader from './loader';
import Labels from './labels.json';
import Global from './global';

class Loading extends PureComponent {
  render() {
    return (
      <div className="loading hide">
        <img src={`${Global.pathImg}searching.gif`} width="300" />
        <Loader />
        <span dangerouslySetInnerHTML={{ __html: Labels[Global.lang].wait }} />
      </div>
    );
  }
}

export default Loading;
