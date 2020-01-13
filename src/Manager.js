import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './App.css'
//import Api from "./api/api.js";

class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname: '',
            barname: ''
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        // Api.post('/bar/create-bar', this.state)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
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
                    <h1 className="text-center text-primary">Ajouter un manager</h1>
                </div>
                <div className={styles.form}></div>
                <form onSubmit={this.mySubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Nom du manager</label>
                            <input type='text' className="form-control" name='name' onChange={this.myChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname">Prénom du manager</label>
                            <input type='text' className="form-control" name='firstname' onChange={this.myChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="barname">Nom du bar</label>
                            <input type='text' className="form-control" name='barname' onChange={this.myChangeHandler} />
                        </div>
                    <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                </form>
            </div>
        )
    }
}
export default Manager;