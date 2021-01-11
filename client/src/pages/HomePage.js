import React from 'react';
import Home from '../components/Home'
export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            surveyName: '',
            surveyCode: '',
            surveyPassword: '',
        };

        this.handleChange = this.handleChange.bind(this);
       // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render(){
        return (
            
            <div>
                {/* <Navbar/> */}
                <Home/>
            </div>
        )
    }
}
