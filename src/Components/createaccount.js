import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../App.css';
import Api from "../api/api.js";
import LocalStorageService from '../api/LocalStorageService';

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        Api.post('/signup', this.state)
            .then(function (response) {
                console.log(response);
                console.log(response.data.token);
                const localStorageService = LocalStorageService.getService();
                localStorageService.setToken(response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.history.push('/bars');
    }


    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div>
                    <h1 className="text-center text-primary">Creer un compte</h1>
                </div>
                <div className={styles.form}></div>
                <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input type='text' className="form-control" name='username' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type='text' className="form-control" name='email' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type='text' className="form-control" name='password' onChange={this.myChangeHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Creer</button>
                </form>
            </div>)
    }
}
export default CreateAccount;