import React, { PureComponent } from 'react';
import Global from './global';

class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <img src={`${Global.pathImg}fridge.svg`} width="50" />
      </div>
    );
  }
}

export default Header;
