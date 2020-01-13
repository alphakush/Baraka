import React, { Component } from 'react';
import './index.css';
import Map from './Components/map.js';
import Contact from './Components/contact.js';
import bars from './Components/bars.js'
import parcours from './Components/parcours.js'
import connexion from './Components/connexion.js'
import AddBar from './Components/AddBar.js'
import Manager from './Components/Manager.js'
import Suscribe from './Components/Suscribe.js'
import { Route, NavLink, HashRouter } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';


class Main extends Component {

  Header() {
    var utilisateur_est_connecte = true;
    return (
      <div className="row bg-dark">
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/">Home </NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/Addbar">Ajouter un bar </NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/bars"> Liste des bars </NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/parcours"> Liste des parcours</NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/contact"> Contact </NavLink></button>
          <div className="col-lg"></div>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/suscribe"> Créer un compte </NavLink></button>
          <button type="button" className="btn btn-dark btn-lg col-lg"><NavLink to="/manager"> Ajouter un manager </NavLink></button>
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
          <div style={{ height: '100%', paddingTop: '5%'}}>
            <Route exact path="/" component={Map} />
            <Route path="/contact" component={Contact} />
            <Route path="/bars" component={bars} />
            <Route path="/suscribe" component={Suscribe} />
            <Route path="/addbar" component={AddBar} />
            <Route path="/parcours" component={parcours} />
            <Route path="/connexion" component={connexion} />
            <Route path="/manager" component={Manager} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default Main;
