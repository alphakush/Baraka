import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './App.css'

class Contact extends Component {   
    // async componentDidMount() {
    //     var userData = await Api.post('/contact');
    //     }
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div>
                    <h1 className="text-center text-primary">Contact</h1>
                </div>
                <div className={styles.form}></div>
                <form>
                    <div className="form-group">
                      <label htmlFor="email">Adresse mail</label>
                      <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                      <small id="emailHelp" className="form-text text-muted">Adresse mail qui sera utilisée pour notre newsletter.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Object</label>
                        <input type="text" className="form-control" id="subject"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="8" id="message"></textarea>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="check"/>
                        <label className="form-check-label" htmlFor="check">Souscrire à la newsletter</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                </form>
            </div>)
    }
}
export default Contact;