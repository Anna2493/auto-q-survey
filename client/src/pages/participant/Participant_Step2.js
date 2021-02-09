import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
// import { getSurveys } from '../BackendFunctions';

export default class Participant_Step2 extends React.Component {
    constructor() {
        super();
        this.state = {
            surveyName: 'This is test survey name',
            privacyNotice: 'This is privacy notice and participant must agree to its terms in order to proceed to the next stage',
            adminName: 'Admin Name',
            adminEmail: 'admin@gmail.com',

        }
    }

  componentDidMount() {
    // const token = localStorage.getItem('ADMIN_TOKEN');
    // const decoded = jwt_decode(token);
    // this.setState({
    //   firstName: decoded.first_name,
    //   email: decoded.email,
    //   adminID: decoded.id,
      
    // });

    // localStorage.setItem('ADMIN_ID', decoded.id)
    // this.get();

  };

//   get() {
//     const requestSurveys = {
//       adminID: localStorage.getItem('ADMIN_ID')
//     }
//     getSurveys(requestSurveys)
//       .then(res => {
//         console.log(res)
//       })
//   };

    render() {
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container">
                <h1 className="sub-heading">
                  Privacy Notice
                </h1>
              </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            <div className='center-2'>
                <p className='headings'>Survey Name</p>
                
                <p className='survey-name'>{this.state.surveyName}</p>
                
                <p className='headings'>Survey Owner</p>
                <p className='admin-name'>{this.state.adminName} {this.state.adminEmail}</p>

                <p className='headings'>Privacy Notice</p>
                    <div className='description-container'>
                        <p className='survey-description'>{this.state.privacyNotice}</p>
                    </div>

            </div>

        </div>
        )
    }
}