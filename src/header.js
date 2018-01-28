import React, { PureComponent } from 'react';

class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <img src="/content/fridge_magnet/fridge.svg" width="50" />
        <h2>Fridge Magnet</h2>
      </div>
    );
  }
}

export default Header;
