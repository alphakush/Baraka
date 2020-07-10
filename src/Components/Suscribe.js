import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../App.css';
import Api from "../api/api.js";
import LocalStorageService from "../api/LocalStorageService";
import { ReCaptcha } from 'react-recaptcha-google'

class Suscribe extends Component {
    constructor(props) {
        super(props);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        if (this.captchaDemo) {
            console.log("started, just a second ...");
            this.captchaDemo.reset();
        }
    }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        console.log(recaptchaToken, "<= your recaptcha token")
    }
    
    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        Api.post('/signup', this.state)
            .then(function (response) {
                console.log(response);
                const localStorageService = LocalStorageService.getService();
                localStorageService.setToken(response.data.token);
                localStorageService.setUsername(response.data.user.username);
                localStorageService.setEmail(response.data.user.email);
                window.location.href=document.location.href.replace("suscribe", "");
            })
            .catch(function (error) {
                console.log(error);
                window.location.href=document.location.href.replace("suscribe", "");
            });

    };


    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    };

    render() {
        return (
            <div style={{ padding:'5%', width: '100%', height: '100%' }}>
                <div>
                    <h1 className="text-center text-primary">Creer un compte</h1>
                </div>
                <div className={styles.form}></div>
                <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Nom d'utilisateur</label>
                        <input type='text' className="form-control" name='username' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Adresse mail</label>
                        <input type='email' className="form-control" name='email' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type='text' className="form-control" name='password' onChange={this.myChangeHandler} />
                    </div>
                    <ReCaptcha
                        ref={(el) => {this.captchaDemo = el;}}
                        size="normal"
                        data-theme="dark"
                        render="explicit"
                        sitekey="6Ld_ZwAVAAAAAMipdT3gK508WuDLkjtg3gbANiDo"
                        onloadCallback={this.onLoadRecaptcha}
                        verifyCallback={this.verifyCallback}
                        style={{display: "center"}}
                    />
                    <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                </form>
            </div>)
    }
}
export default Suscribe;
