import axios from 'axios';

export const register = newAdmin => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: newAdmin.first_name,
            surname: newAdmin.surname,
            email: newAdmin.email,
            password: newAdmin.password,
        })
    });
}

export const createSurvey = newSurvey => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/survey", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adminID: newSurvey.adminID,
            surveyName: newSurvey.surveyName,
            surveyDescription: newSurvey.surveyDescription,
            category1: newSurvey.category1,
            category2: newSurvey.category2,
            category3: newSurvey.category3,
            privacyStatement: newSurvey.privacyStatement,
            surveyCode: newSurvey.surveyCode,
            date: newSurvey.date
        })
    });
}

export const createAnchor = newAnchor => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/anchor", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            anchor: newAnchor.anchor,
            slots: newAnchor.slots,
            surveyID: newAnchor.surveyID
        })
    });
}

export const getSurveys = requestSurveys => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/getSurveys", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adminID: requestSurveys.adminID,
        })
    })
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            var surveyNames = data.map(({ survey_name }) => survey_name);
            var surveyCodes = data.map(({ survey_code }) => survey_code);
            var surveyDates = data.map(({ date }) => date);
            var listOfIds = data.map(({ survey_id }) => survey_id);
            //var listOfCodes = data.map(({ survey_code }) => survey_code);
            
            localStorage.setItem('SURVEY_NAMES', surveyNames);
            localStorage.setItem('SURVEY_CODES', surveyCodes);
            localStorage.setItem('SURVEY_DATES', surveyDates);
            localStorage.setItem('SURVEY_IDS', listOfIds);

            //Getting last id and codes was inspirded by legacy code
            var currentId = listOfIds[listOfIds.length - 1];
            var currentCode = surveyCodes[surveyCodes.length - 1];
            localStorage.setItem('CURRENT_ID', currentId);
            localStorage.setItem('CURRENT_CODE', currentCode);

            localStorage.setItem('TEST', 'Test string');
        })
        .catch(error => console.log(error));
}
    


export const createStatement = newStatement => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/statement", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            statement: newStatement.statement,
            surveyID: newStatement.surveyID
        })
    });
}

export const createQuestion = newQuestion => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/question", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: newQuestion.question,
            surveyID: newQuestion.surveyID
        })
    });
}

export const getSurveys2 = survey => {
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


export const createBoard = newBoard => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/board", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            surveyID: newBoard.surveyID,
            adminID: newBoard.adminID,
            anchor: newBoard.anchorsList.anchor,
            slots: newBoard.slots,
            totalSlots: newBoard.totalSlots
        })
    });
}


// export const register = newAdmin => {
//     return axios
//         .post('admins/register', {
//             first_name: newAdmin.first_name,
//             surname: newAdmin.surname,
//             email: newAdmin.email,
//             password: newAdmin.password,
//         })
//         .then(response => {
//         console.log(response)
        
//     })
// }

// export const register = newAdmin => {
//     fetch('admins/register', {

//         // method: 'POST',
//         // headers: {
            
//         //     'Content-Type': 'application/json'
//         // },
//         // body: ({
//             first_name: newAdmin.first_name,
//             surname: newAdmin.surname,
//             email: newAdmin.email,
//             password: newAdmin.password,
//         //})
//     })
//         .then(response => {
//             console.log(response)
//         })
// }

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

