import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header';
import Todo from './todo';
import { productsFR } from './products';
import './scss/index.scss';

const SERVER = 'https://wabr.inliteresearch.com/barcodes';

class FridgeMagnet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      words: [13, 6, 9, 12, 30],
      imagePreviewUrl: '',
    };

    this.changeInputFile = this.changeInputFile.bind(this);
  }

  changeInputFile(files) {
    this.loadFile(files);

    // Displays image
    const reader = new FileReader();
    const file = files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  async loadFile(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('file[]', file, file.name);
    }

    const myHeaders = new Headers();

    const myInit = {
      types: 'DataMatrix',
      method: 'post',
      body: formData,
      headers: myHeaders,
      processData: false,
      contentType: false,
    };

    this.showLoader(true);

    const response = await fetch(SERVER, myInit);
    const result = await response.json();
    console.log('result', result);

    this.parseJson(result);
    this.showLoader(false);

  }

  showLoader(value) {
    const loader = document.querySelector('.loading');
    if (value) {
      loader.classList.remove('hide');
    } else {
      loader.classList.add('hide');
    }
  }

  parseJson(obj) {
    if (obj.Barcodes.length === 0) {
      console.log('No barcodes found');
    }
    const words = [];
    obj.Barcodes.map((barcode) => {
      const id = Number(barcode.Text.substr(0, 2)) - 1;
      words.push(productsFR[id]);
    });
    this.setState({ words });
  }

  procError(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 0) { return `CORS error or server URL is not resolved: ${SERVER}`; }
    const tab = '   ';
    return `STATUS: ${jqXHR.status}${tab}${textStatus}${tab}${errorThrown}${tab}${jqXHR.responseText}`;
  }

  render() {
    return (
      <div className="container">
      <Header />
        <div className="file">
        <div className="file-title">Upload a picture!</div>
        <input type="file" onChange={ e => this.changeInputFile(e.target.files) } />
        </div>
        <div className="loading hide">
          <img src="200w_d.gif" />
        </div>
        <div className="todo">
          <div className="todo-title">Votre liste de courses</div>
          <div className="todo-list">
          { <Todo words={this.state.words} /> }
          </div>
        </div>
        <img src={ this.state.imagePreviewUrl } width="600" />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <FridgeMagnet />,
  document.getElementById('root'),
);
