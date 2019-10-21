import React, { Component } from 'react';
import './index.css';
import Map from './map.js';
import Contact from './contact';
import actualite_bars from './actualite_bars'
import bars from './bars'
import parcours from './parcours'
import connexion from './connexion'
import { Route, NavLink, HashRouter } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { utilisateur_est_connecte: true };
  }

  Header() {
    var bool = true;
    return (
      <div className="head" style={{ width: '100%', height: '100%' }}>
        <ul className="header">
          <li><NavLink to="./map">Home</NavLink></li>
          {bool ? (<li><NavLink to="./connexion">Se connecter</NavLink></li>)
           : (<li><NavLink to="./connexion">Créer un compte</NavLink></li>)}
          <li><NavLink to="./contact">Contact</NavLink></li>
          <li><NavLink to="./actualite_bars">Actualite bars</NavLink></li>
          <li><NavLink to="./bars">bars</NavLink></li>
          <li><NavLink to="./parcours">parcours</NavLink></li>
        </ul>
      </div>)
  }

  render() {
    return (
      <HashRouter>
        <div style={{ width: '100vw', height: '100vh' }}>
          <div style={{ width: '100%', height: '3%' }}>
            <this.Header />
          </div>
          <div style={{ width: '100%', height: '97%' }}>
            <Route exact path="/map" component={Map} />
            <Route path="/contact" component={Contact} />
            <Route path="/actualite_bars" component={actualite_bars} />
            <Route path="/bars" component={bars} />
            <Route path="/parcours" component={parcours} />
            <Route path="/connexion" component={connexion} />
          </div>
        </div>
      </HashRouter>
    )
  }
}
export default Main;
