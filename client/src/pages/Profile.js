import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            email: '',
            adminID: '',
        }
    }

    componentDidMount() {
    const token = localStorage.getItem('adminToken');
    const decoded = jwt_decode(token);
    this.setState({
      firstName: decoded.first_name,
      email: decoded.email,
      adminID: decoded.id,
      
    });

    //localStorage.setItem('adminID', decoded.id)

  }

    render() {
        return (
            <div>
                <h1>Profile page</h1>
                <table>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{this.state.firstName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Id</td>
                <td>{this.state.id}</td>
              </tr>
            </tbody>
          </table>
            </div>
        )
    }
}