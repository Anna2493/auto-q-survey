import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            email: '',
            id: '',
        }
    }

    render() {
        return (
            <div>
                <h1>Profile page</h1>
            </div>
        )
    }
}