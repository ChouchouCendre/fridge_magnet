/* global Tesseract */

import React from 'react';
import ReactDOM from 'react-dom';

import './scss/index.scss';

class FridgeMagnet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      words: ['plop'],
    };

    this.changeInputFile = this.changeInputFile.bind(this);
    this.recognizeFile = this.recognizeFile.bind(this);
  }

  changeInputFile(files) {
    console.log('@@ changeInputFile', files);

    const file = files[0];
    /*
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
    */

    // <input type="file" onchange="Tesseract.recognize(this.files[0]).progress(function(data){console.log(data)}).then(function(data){console.log(data)})">

    // console.log('file', file);
    Tesseract.recognize(file, { lang: 'fra', classify_character_fragments_garbage_certainty_threshold: -30 })
      .progress(message => console.log(message))
      .catch(err => console.error(err))
      .then(result => console.log(result))
      .finally(resultOrError => this.recognizeFile(resultOrError));
  }

  recognizeFile(resultOrError) {
    console.log('resultOrError', resultOrError);
    // resultOrError.words.map(value => );
    this.setState({ words: resultOrError.lines });
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
    return this.state.words.map(item => `${item.text}---`);
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
