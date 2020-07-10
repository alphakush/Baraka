import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Api from "../api/api.js";
import 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import LocalStorageService from "../api/LocalStorageService";

    export default class Login extends Component {
      constructor(props) {
        super(props);

        this.state = {
          email: "",
          password: ""
        };
      }

      validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      };

      handleSubmit = event => {
          event.preventDefault();
          Api.post('/signin', this.state)
          .then(function (response) {
              console.log(response);
              const localStorageService = LocalStorageService.getService();
              localStorageService.setToken(response.data.token);
              localStorageService.setUsername(response.data.user.username);
              localStorageService.setEmail(response.data.user.email);
              window.location.href=document.location.href.replace("connexion", "");
          })
          .catch(function (error) {
              console.log(error);
              window.location.href=document.location.href.replace("connexion", "");
          });
      };

      setRedirect = () => {
        this.setState({
          redirect: true
        })
        {this.renderRedirect()}
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/suscribe' />
        }
      }

      render() {
        return (
          <div className="Login">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="email">
              <Form.Label column="text" >Adresse mail</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
              <Form.Label column="text" >Mot de passe</Form.Label>
                <Form.Control
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </Form.Group>
              <Button
                block
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
              <Button
                block
                onClick={this.setRedirect}
              >
                        {this.renderRedirect()}
                Créer un compte
              </Button>
            </Form>
          </div>

        );
      }
    }
