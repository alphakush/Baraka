import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import ImageUploader from 'react-images-upload';
import styles from '../App.css'
import Api from "../api/api.js";

class AddBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'upload-bar': null,
            name: '',
            description : '',
            tags: [],
            address: '',
            products: [],
            note: "4.5",
            phone: ''
        };
    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        'upload-bar': img
      });
    }
  };    

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        const fd = new FormData();
        fd.append('upload-bar', this.state["upload-bar"]);
        fd.append('name', this.state.name);
        fd.append('description', this.state.descritpion);
        fd.append('tags', this.state.tags);
        fd.append('address', this.state.address);
        fd.append('products', this.state.products);
        fd.append('note', this.state.note);
        fd.append('phone', this.state.phone);
        Api.post('/bar/create-bar', fd, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(res=> {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });
        this.props.history.push('/addbar');
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        switch (nam) {
            case "tags":
                let tmp = (val.split(','))
                let split = tmp 
                this.setState({ tags: split });
                break
            case "products":
                let list = (val.split(','))
                let data = list 
                this.setState({ products: data });
                break
            default:
                this.setState({ [nam]: val });
                break
        }
    }

    render() {
        return (
            <div style={{ padding: '5%', width: '100%', height: '100%' }}>
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
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <label htmlFor="address">Adresse</label>
                            <input type='text' className="form-control" name='address' onChange={this.myChangeHandler} />
                        </div>
                        <div className="col">
                            <label htmlFor="number">Numéro</label>
                            <input type='text' className="form-control" name='phone' onChange={this.myChangeHandler} />
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
                    <div className="form-group">
                        <input type="file" className="btn btn-outline-primary" name="myImage" onChange={this.onImageChange} />
                    </div>
                     <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                </form>
            </div>
        )
    }
}
export default AddBar;