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

export const createAnswer = newAnswer => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/answer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            questionNumber: newAnswer.questionNumber,
            question: newAnswer.question,
            answer: newAnswer.answer,
            surveyID: newAnswer.surveyID
        })
    });
}

export const createResult = newResult => {
    return fetch("https://auto-q-survey-web.herokuapp.com/api/result", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            anchorNumber: newResult.questionNumber,
            statement: newResult.statement,
            statementNumber: newResult.statementNumber,
            surveyID: newResult.surveyID
        })
    });
}



