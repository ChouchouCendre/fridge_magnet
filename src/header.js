import React, { PureComponent } from 'react';
import Global from './global';

class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <img src={`${Global.pathImg}fridge.svg`} width="50" />
        <h2>Fridge Magnet</h2>
      </div>
    );
  }
}

export default Header;
