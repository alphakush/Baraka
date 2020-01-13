import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ImageUploader from 'react-images-upload';
import styles from '../App.css'
import Api from "../api/api.js";

class AddBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            adress: '',
            number: '',
            manager: '',
            image: [],
            tags: [],
            note: 0,
            products: {}
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            image: this.state.image.concat(picture),
        });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        Api.post('/bar/create-bar', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.history.push('/bars');
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        switch (nam) {
            case "tags":
                val = "[" + val + "]"
                this.state.tags.push(val);
                break
            case "products":
                let list = (val.split(','))
                let data = { list }
                this.setState({ products: data });
                break
            default:
                this.setState({ [nam]: val });
                break
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div>
                    <h1 className="text-center text-primary">Ajouter un bar</h1>
                </div>
                <div className={styles.form}></div>
                <form onSubmit={this.mySubmitHandler}>
                    <div className="row form-group">
                        <div className="col-lg">
                            <label htmlFor="name">Nom du bar</label>
                            <input type='text' className="form-control" name='name' onChange={this.myChangeHandler} />
                        </div>
                        <div className="col-lg">
                            <label htmlFor="manager">Nom du responsable</label>
                            <input type='text' className="form-control" name='manager' onChange={this.myChangeHandler} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <label htmlFor="adress">Adresse</label>
                            <input type='text' className="form-control" name='adress' onChange={this.myChangeHandler} />
                        </div>
                        <div className="col">
                            <label htmlFor="number">Numéro</label>
                            <input type='text' className="form-control" name='number' onChange={this.myChangeHandler} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <label htmlFor="adress">Tags</label>
                            <input type='text' className="form-control" name='tags' onChange={this.myChangeHandler} />
                        </div>
                        <div className="col">
                            <label htmlFor="adress">Produits proposés</label>
                            <input type='text' className="form-control" name='products' onChange={this.myChangeHandler} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description du bar</label>
                        <textarea className="form-control" rows="6" name='description' onChange={this.myChangeHandler}></textarea>
                    </div>
                    <br/>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={5242880}
                        />
                    <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                </form>
            </div>
        )
    }
}
export default AddBar;