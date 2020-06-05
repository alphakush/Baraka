import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../App.css';
import Api from "../api/api.js";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            objet: '',
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        Api.post('/contact-us', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        alert('Merci de nous avoir écrit, nous vous répondrons dans les plus brefs délais.')
    }

    handleChange(event) {
        this.setState({objet: event.target.value});
      }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    
    render() {
        return (
            <div style={{ padding: '5%', width: '100%', height: '100%' }}>
                <div>
                    <h1 className="text-center text-primary">Contact</h1>
                </div>
                <div className={styles.form}></div>
                <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Adresse mail</label>
                        <input type='text' className="form-control" name='email' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="objet">Choisissez le objet</label>
                            <select className="form-control" value={this.state.objet} onChange={this.handleChange}>
                                <option value="Requete">Requête</option>
                                <option value="Conseils">Conseils</option>
                                <option value="Probleme">Problèmes de comptes</option>
                                <option value="Contact">Contact</option>
                            </select>
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