/* global Tesseract */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './scss/index.scss';

const BACK_URL = 'http://localhost:4000';

class FridgeMagnet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      words: ['plop'],
    };

    // this.loadFile();

    this.changeInputFile = this.changeInputFile.bind(this);
    this.recognizeFile = this.recognizeFile.bind(this);

    // https://github.com/naptha/tesseract.js
  }

  changeInputFile(files) {
    console.log('@@ changeInputFile', files);

    const file = files[0];
    Tesseract.recognize(file, {
      lang: 'fra',
      user_words_suffix: 'fra.user-words',
      language_model_penalty_font: 1,
    })
      .progress(message => console.log(message))
      .catch(err => console.error(err))
      .then(result => console.log(result))
      .finally(resultOrError => this.recognizeFile(resultOrError));
  }

  async loadFile(file) {
    const response = await fetch(`${BACK_URL}/?img=${file}`);
    const result = await response.json();
    console.log('result', result);
  }

  recognizeFile(resultOrError) {
    console.log('resultOrError', resultOrError);

    const tmp = [];
    resultOrError.words.map((word) => {
      console.log('word', word);
      if (word.text.length >= 3) tmp.push(word.text);
    });

    console.log('tmp', tmp);

    const singleString = tmp.join();
    console.log('singleString', singleString);

    const allCapWords = singleString.match(/\b[A-Z]{3,}\b/g);
    console.log('allCapWords', allCapWords);
    const listFR = [
      ['CAFE', 'CAFÉ'],
      ['PAIN DE MIE'],
      ['CACAO'],
      ['CREME', 'CRÈME'],
      ['GRUYERE RAPE', 'GRUYÈRE RÂPÉ'],
      ['EPONGE', 'ÉPONGE'],
      ['HARICOTS VERTS'],
      ['CHAMPIGNONS'],
      ['FROMAGE'],
    ];
    const currentList = [];
    allCapWords.map((wordOCR) => {
      listFR.map((wordList, o) => {
        const index = wordList[0].indexOf(wordOCR);
        console.log('------');
        console.log('wordOCR', wordOCR);
        console.log('wordList', wordList);
        console.log('index', index);
        if (index !== -1) {
          if (wordList.length === 2) {
            currentList.push(wordList[1]);
          } else {
            currentList.push(wordList[0]);
          }
          listFR.splice(o, 1);
        }
      });
    });

    this.setState({ words: currentList });

    // http://todomvc.com/examples/react/#/
    new App();
  }

  renderWords() {
    /*
    return (
      <div className="container-content_cards">
        { this.state.questions.map((question, index) => this.injectCard(question, index)) }
      </div>
    );
    */
    console.log('this.state.words', this.state.words);
    return this.state.words.map(item => `${item}---`);
  }

  render() {
    return (
      <div className="container">
        <input type="file" onChange={ e => this.changeInputFile(e.target.files) } />
        {/*
        <img src={this.state.imagePreviewUrl} />
        */}
        { this.renderWords() }
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <FridgeMagnet />,
  document.getElementById('root'),
);
