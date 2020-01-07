import React, { Component } from 'react';
import './index.css';
import Map from './Components/map.js';
import Contact from './Components/contact';
import bars from './Components/bars'
import parcours from './Components/parcours'
import connexion from './Components/connexion'
import { Route, NavLink, HashRouter } from "react-router-dom";

class Main extends Component {

  Header() {
    var utilisateur_est_connecte = true;
    return (
      <div className="head" style={{ width: '100%', height: '100%' }}>
        <ul className="header">
          <li><NavLink to="/">Home </NavLink></li>
          <li><NavLink to="/bars"> Liste des bars </NavLink></li>
          <li><NavLink to="/parcours"> Liste des parcours</NavLink></li>
          <li><NavLink to="/contact"> Contact </NavLink></li>
          {utilisateur_est_connecte ? (<li><NavLink to="./connexion">Se connecter</NavLink></li>)
           : (<li><NavLink to="./connexion">Créer un compte</NavLink></li>)}
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
            <Route exact path="/" component={Map} />
            <Route path="/contact" component={Contact} />
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
