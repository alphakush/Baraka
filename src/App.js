import React, { Component } from 'react';
import './index.css';
import Map from './Components/map.js';
import Contact from './Components/contact.js';
import bars from './Components/bars.js'
import parcours from './Components/parcours.js'
import login from './Components/Login.js'
import logout from './Components/Logout.js'
import AddBar from './Components/AddBar.js'
import Suscribe from './Components/Suscribe.js'
import {Route, BrowserRouter, Link} from "react-router-dom";
import LocalStorageService from "./api/LocalStorageService";

class Main extends Component {
    Header() {
    let localStorageService = LocalStorageService.getService();
    return (
      <div className="row bg-dark">
          <button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/">Home </Link></button>
          {localStorageService.getUsername() !== null ? (<button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/Addbar">Ajouter un bar </Link></button>):null}
          <button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/bars"> Liste des bars </Link></button>
          {localStorageService.getUsername() !== null ? (<button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/parcours"> Liste des parcours</Link></button>):null}
          {localStorageService.getUsername() !== null ? (<button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/contact"> Contact </Link></button>):null}
          <div className="col-lg"/>
          {localStorageService.getUsername() !== null ? (<button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/logout">Hello {localStorageService.getUsername()}</Link></button>)
              : (<button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/suscribe"> Créer un compte </Link></button>)}
          {localStorageService.getUsername() === null ? (<button type="button" className="btn btn-dark btn-lg col-lg"><Link to="/connexion">Se connecter</Link></button>):null}
        </div>)
  }
  
  render() {
    return (
      <BrowserRouter>
        <div style={{ background: '#dceafd', width: '100vw', height: '100vh' }}>
          <div style={{ width: '100%', height: '0%' }}>
            <this.Header />
          </div>
          <div style={{ height: '100%', paddingTop: '2.5%'}}>
            <Route path="/" exact component={Map} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/bars" exact component={bars} />
            <Route path="/suscribe" exact component={Suscribe} />
            <Route path="/addbar" exact component={AddBar} />
            <Route path="/parcours" exact component={parcours} />
            <Route path="/connexion" exact component={login} />
            <Route path="/logout" exact component={logout} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main;
