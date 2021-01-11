import axios from 'axios';

export const register = newAdmin => {
    return axios
        .post('admins/register', {
            first_name: newAdmin.first_name,
            surname: newAdmin.surname,
            email: newAdmin.email,
            password: newAdmin.password,
        })
        .then(response => {
        console.log(response)
        
    })
}

export const login = admin => {
    return axios
        .post('admins/login', {
            email: admin.email,
            password: admin.password
        })
        .then(res => {
            localStorage.setItem('adminToken', res.data)
            
            //console.log(res.first_name)
            return res.data
            
        })
        .catch(err => {
        console.log(err)
    })
}

export const create = survey => {
    return axios
        .post('surveys/surveyStep1', {
            surveyName: survey.surveyName,
            description: survey.description,
            category1: survey.category1,
            category2: survey.category2,
            category3: survey.category3,
            privacyNotice: survey.privacyNotice,

            adminID: survey.adminID
        })
        .then(res => {
            //localStorage.setItem('adminToken', res.data)
            //console.log(res.first_name)
            return res.data

        })
        .catch(err => {
            console.log(err)
        })
}

export const getSurveys = survey => {
    return axios
        .post('surveys/getSurveys', {
            adminID: survey.adminID
        })
        .then(res => {
            //localStorage.setItem('adminToken', res.data)
            console.log(res.surveyName)
            return res.data

        })
        // .then((data) => {
        //     console.log(data)
        // })
        .catch(err => {
            console.log(err)
        })
}