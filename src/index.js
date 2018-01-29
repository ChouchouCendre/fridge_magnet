/* global NODE_ENV */

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header';
import Todo from './todo';
import Toolbar from './toolbar';
import Loading from './loading';
import Global from './global';
import { productsFR, productsEN } from './products';
import './scss/index.scss';
import Labels from './labels.json';

const SERVER = 'https://wabr.inliteresearch.com/barcodes';
const fake = false;

/*
// TODO : variable environment for path images
*/

class FridgeMagnet extends React.Component {

  constructor(props) {
    super(props);
    Global.lang = this.getLanguage();
    console.log('===> ', NODE_ENV);
    if (NODE_ENV === 'prod') {
      Global.pathImg = '/content/fridge_magnet/';
    }

    this.state = {
      wordsID: [],
      imagePreviewUrl: '',
      imagePreviewName: '',
      noDatamatrixFound: false,
      nbElements: 0,
    };

    this.changeInputFile = this.changeInputFile.bind(this);
    this.onClear = this.onClear.bind(this);
    this.clickRestart = this.clickRestart.bind(this);
  }

  getLanguage() {
    let lang = window.location.href.split('?lang=')[1];
    if (!lang) lang = 'fr';
    return lang;
  }

  changeInputFile(files) {
    this.loadFile(files);

    this.setState({
      noDatamatrixFound: false,
      imagePreviewName: files[0].name,
    });
    const example = document.querySelector('.example');
    example.classList.add('hide');

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
    let result = null;

    // Fake temporary
    if (fake) {
      const tmpArray = [];
      let rand = Math.floor(Math.random() * (productsFR.length / 2));
      if (rand < 3) rand = 3;
      for (let i = 0; i < rand; i++) {
        const alea = Math.floor(Math.random() * productsFR.length);
        if (tmpArray.indexOf(alea) === -1) {
          tmpArray.push(alea);
        }
      }
      this.setState({ wordsID: tmpArray, noDatamatrixFound: false, nbElements: tmpArray.length });
      return;
    }

    const response = await fetch(SERVER, myInit);
    result = await response.json();
    console.log('=== result', result);
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
      this.setState({ noDatamatrixFound: true, nbElements: 0 });
      return;
    }
    const wordsID = [];
    obj.Barcodes.map((barcode) => {
      const id = Number(barcode.Text.substr(0, 2)) - 1;
      wordsID.push(id);
    });
    this.setState({ wordsID, noDatamatrixFound: false, nbElements: wordsID.length });
  }

  procError(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 0) { return `CORS error or server URL is not resolved: ${SERVER}`; }
    const tab = '   ';
    return `STATUS: ${jqXHR.status}${tab}${textStatus}${tab}${errorThrown}${tab}${jqXHR.responseText}`;
  }

  onClear() {
    const elements = document.querySelectorAll('input:checked');
    const wordsID = this.state.wordsID;
    elements.forEach((element) => {
      const id = element.parentNode.parentNode.getAttribute('data-id');
      const index = wordsID.indexOf(Number(id));
      wordsID.splice(index, 1);
    });
    this.setState({ wordsID });
  }

  getLabels() {
    const wordsLabel = [];
    this.state.wordsID.forEach((id) => {
      if (Global.lang === 'fr') {
        wordsLabel.push([productsFR[id]]);
      } else {
        wordsLabel.push([productsEN[id]]);
      }
    });
    return wordsLabel;
  }

  clickRestart() {
    this.setState({ wordsID: [], imagePreviewName: null });
  }

  renderNotFound() {
    if (!this.state.noDatamatrixFound) return null;
    return (
      <div className="notFound"><span dangerouslySetInnerHTML={{ __html: Labels[Global.lang].noDatamatrix }} /><br /><br /><img src="alice.gif" width="300" /></div>
    );
  }

  renderFile() {
    if (!this.state.imagePreviewName) {
      return (
        <div className="file">
          <div className="file-title">{ Labels[Global.lang].file }</div>
            <input type="file" name="file" id="file" className="inputfile" onChange={ e => this.changeInputFile(e.target.files) } />
            <label htmlFor="file"><i className="fa fa-file-image-o" aria-hidden="true"></i> <span>{ Labels[Global.lang].browse }</span></label>
            <span className="inputfile-name">{ this.state.imagePreviewName }</span>
        </div>
      );
    } else {
      return (
        <div className="restart">
          <span className="restart-button" onClick={ this.clickRestart }><i className="fa fa-refresh" aria-hidden="true"></i> Recommencer</span>
        </div>
      );
    }
  }

  render() {
    const classTodo = this.state.wordsID.length === 0 ? 'todo hide' : 'todo';
    return (
      <div className="container">
      <Header />
      { this.renderFile() }
      <Loading />
        { this.renderNotFound() }
        <div className={classTodo}>
          <div className="todo-title">{ Labels[Global.lang].list }</div>
          <div className="todo-list">
          { <Todo wordsID={this.state.wordsID} lang={Global.lang} /> }
          </div>
          <Toolbar
          onClear={this.onClear}
          labels={this.getLabels()}
          lang={Global.lang}
          />
        </div>
        <div className="example">
          <span>{ Labels[Global.lang].example }</span>
          <img src="example.jpg" width="400" />
        </div>
        <div className="image">
          <img src={ this.state.imagePreviewUrl } width="500" />
        </div>
        <div className="footer">
        <i className="fa fa-info-circle" aria-hidden="true"></i> <span dangerouslySetInnerHTML={{ __html: Labels[Global.lang].footer }} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <FridgeMagnet />,
  document.getElementById('root'),
);
