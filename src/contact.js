import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './App.css'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            object: '',
            message: ''
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    //
    //  this.state contient les données du formulaire
    //
    //  Vous pourrez accéder aux variables suivantes :
    //
    //  this.state.email        - email de l'utilisateur
    //
    //  this.state.object       - object du formulaire de contact
    //
    //  this.state.message      - corps de message du formulaire de contact
    //

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div>
                    <h1 className="text-center text-primary">Contact</h1>
                </div>
                <div className={styles.form}></div>
                <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Adresse mail</label>
                        <input type='text' className="form-control" name='email' onChange={this.myChangeHandler} />
                        <small name="emailHelp" className="form-text text-muted">Adresse mail qui sera utilisée pour notre newsletter.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="object">Object</label>
                        <input type='text' className="form-control" name='object' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea type='text' className="form-control" rows="8" name='message' onChange={this.myChangeHandler}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                </form>
            </div>)
    }
}
export default Contact;