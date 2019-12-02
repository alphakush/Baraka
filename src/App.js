import React, { Component } from 'react';
import './index.css';
import Map from './map.js';
import Contact from './Contact';
import Bars from './Bars'
import parcours from './parcours'
import connexion from './connexion'
import { Route, NavLink, HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {

  Header() {
    var utilisateur_est_connecte = true;
    return (
      <div className="row bg-dark">
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/">Home </NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/bars"> Liste des bars </NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/parcours"> Liste des parcours</NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/contact"> Contact </NavLink></button>
          <div className="col-lg"></div>
          <div className="col-lg"></div>
          <div className="col-lg"></div>
          {utilisateur_est_connecte ? (<button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="./connexion">Se connecter</NavLink></button>)
           : (<NavLink to="./connexion">Créer un compte</NavLink>)}
        </div>)
  }
  
  render() {
    return (
      <HashRouter>
        <div style={{ background: '#dceafd', width: '100vw', height: '100vh' }}>
          <div style={{ width: '100%', height: '0%' }}>
            <this.Header />
          </div>
          <div style={{ height: '100%', padding: '5%'}}>
            <Route exact path="/" component={Map} />
            <Route path="/contact" component={Contact} />
            <Route path="/bars" component={Bars} />
            <Route path="/parcours" component={parcours} />
            <Route path="/connexion" component={connexion} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default Main;
