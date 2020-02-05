import React, { Component } from "react";
    import Form from 'react-bootstrap/Form'
    import Button from 'react-bootstrap/Button'
    import Api from "../api/api.js";
    import 'react-bootstrap';

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
      }

      handleSubmit = event => {
          event.preventDefault();
          console.log(this.state);
          Api.post('/signin', this.state)
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
      this.props.history.push('/');
      }

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