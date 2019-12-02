import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './App.css'

class Contact extends Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div>
                    <h1 className="text-center text-primary">Contact</h1>
                </div>
                <div className={styles.form}></div>
                <form>
                    <div className="form-group">
                      <label for="email">Adresse mail</label>
                      <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                      <small id="emailHelp" className="form-text text-muted">Adresse mail qui sera utilisée pour notre newsletter.</small>
                    </div>
                    <div className="form-group">
                        <label for="subject">Object</label>
                        <input type="text" className="form-control" id="subject"/>
                    </div>
                    <div className="form-group">
                        <label for="message">Message</label>
                        <textarea class="form-control" rows="8" id="message"></textarea>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="check"/>
                        <label className="form-check-label" for="check">Souscrire à la newsletter</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                </form>
            </div>)
    }
}
export default Contact;