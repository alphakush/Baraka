import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ImageUploader from 'react-images-upload';
import styles from './App.css'

class AddBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            adress: '',
            descritpion: '',
            image: []
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
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
                    <h1 className="text-center text-primary">Ajouter un bar</h1>
                </div>
                <div className={styles.form}></div>
                <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Nom du bar</label>
                        <input type='text' className="form-control" name='name' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adress">Adresse</label>
                        <input type='text' className="form-control" name='adress' onChange={this.myChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description du bar</label>
                        <textarea type='text' className="form-control" rows="8" name='description' onChange={this.myChangeHandler}></textarea>
                    </div>
                    <br/>
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
            </div>)
    }
}
export default AddBar;