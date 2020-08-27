import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Api from "../api/api.js";
import 'react-bootstrap';
import LocalStorageService from "../api/LocalStorageService";
import { ReCaptcha } from 'react-recaptcha-google'

    export default class Login extends Component {
      constructor(props) {
        super(props);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
          email: "",
          password: ""
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
          this.token = recaptchaToken;
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
          if (this.token === undefined)
          {
              alert("captcha not validated");
              return;
          }
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
              alert("username or password incorrect");
              window.location.href=document.location.href.replace("connexion", "");
          });
      };

      render() {
        return (
          <div className="Login">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="email">
                <Form.Control
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </Form.Group>
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
              <Button
                block
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
            </Form>
          </div>
        );
      }
    }
