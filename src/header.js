import React, { PureComponent } from 'react';

class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <img src="fridge.svg" width="50" />
        <h1>Fridge Magnet</h1>
        <h2>Les Aventures du Chouchou Cendré</h2>
      </div>
    );
  }
}

export default Header;
