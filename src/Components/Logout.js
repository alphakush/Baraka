import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'react-bootstrap';
import LocalStorageService from "../api/LocalStorageService";

export default class Logout extends Component {
    handleSubmit = event => {
        event.preventDefault();
        const localStorageService = LocalStorageService.getService();
        localStorageService.clearToken();
        localStorageService.clearUsername();
        localStorageService.clearEmail();
        alert("logout succesfully");
        window.location.href=document.location.href.replace("logout", "");
    }

    render() {
        return (
            <div className="Logout">
                <Form onSubmit={this.handleSubmit}>
                    <Button
                        block
                        type="submit">
                        Logout
                    </Button>
                </Form>
            </div>
        );
    }
}
