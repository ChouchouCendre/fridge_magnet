import React, { PureComponent } from 'react';

class Header extends PureComponent {
  render() {
    return (
      <div className="simulateur-intro">
        <h1><i className="fa fa-calculator" aria-hidden="true"></i> Simulateur de salaire pour assistante maternelle agréée</h1>
        <h2>Les Aventures du Chouchou Cendré{/* <br /><a href="http://www.lesaventuresduchouchou.com/simulateur">www.lesaventuresduchouchou.com/simulateur</a> */}</h2>
        <span className="simulateur-intro_subtitle">Ce simulateur est un simulateur simplifié. Il ne prend pas en compte les options avancées (par exemple les heures supplémentaires).</span>
      </div>
    );
  }
}

export default Header;
