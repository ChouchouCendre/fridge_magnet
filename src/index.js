import React from 'react';
import ReactDOM from 'react-dom';
import Tesseract from 'tesseract.js';

import './scss/index.scss';

class FridgeMagnet extends React.Component {

  constructor(props) {
    super(props);

    /*
    this.state = {
      tarif: cTarif || 3.70, // Tarif horaire NET
    };
    */

    this.recognizeFile = this.recognizeFile.bind(this);
  }

  recognizeFile(e) {
    console.log('@@ recognizeFile', e);
    // window.lastFile=this.files[0]
    console.log('window.lastFile', window.lastFile);
  }

  render() {

    return (
      <div className="container">
        <input type="file" onChange={ this.recognizeFile } />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <FridgeMagnet />,
  document.getElementById('root'),
);
