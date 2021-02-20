import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MyProvider } from './Context';
import Cookies from 'js-cookie';
import AuthApi from './AuthApi';

import HomePage from './pages/HomePage';
import Registration from './pages/Registration';
//ADMIN ROUTES
import Profile from './pages/Profile';
import CreateSurvey_Step1 from './pages/CreateSurvey_Step1';
import CreateSurvey_Step2 from './pages/CreateSurvey_Step2';
import CreateSurvey_Step3 from './pages/CreateSurvey_Step3';
import ManuallStatements from './pages/ManuallStatements';
import UploadStatements from './pages/UploadStatements';
import CreateSurvey_Step4 from './pages/CreateSurvey_Step4';
import CreateSurvey_Finish from './pages/CreateSurvey_Finish';
//PARTICIPANT ROUTES
import Participant_Home from './pages/participant/Participant_Home';
import Participant_Step1 from './pages/participant/Participant_Step1';
import Participant_Step2 from './pages/participant/Participant_Step2';
import Participant_Step3 from './pages/participant/Participant_Step3';
import Participant_Step4 from './pages/participant/Participant_Step4';
import Participant_Step4_test from './pages/participant/Participant_Step4_test';
import Participant_Step4_Second from './pages/participant/Participant_Step4_Second';

function App() {
  const [auth, setAuth] = React.useState(false);
  
  const readCookie = () => {
    const user = Cookies.get('user');
    if (user === 'true'){
      setAuth(true);
    }
  }
  
  React.useEffect(() => {
    readCookie();
  }, [])
  
  return (
    <div>
      <AuthApi.Provider value={{auth,setAuth}}>
        <Router>
          <Routes/>
        </Router>
      </AuthApi.Provider>
      
    </div>
  );
}

const Routes = () => {
  const Auth = React.useContext(AuthApi)
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={Registration} />
      <ProtectedProfile path="/profile" auth={Auth.auth} component={Profile} />
      <Route path="/CreateSurvey_Step1" component={CreateSurvey_Step1} />
      <Route path="/CreateSurvey_Step2" component={CreateSurvey_Step2} />
      <Route path="/CreateSurvey_Step3" component={CreateSurvey_Step3} />
      <Route path="/ManuallStatements" component={ManuallStatements} />
      <Route path="/UploadStatements" component={UploadStatements} />
      <Route path="/CreateSurvey_Step4" component={CreateSurvey_Step4} />
      <Route path="/CreateSurvey_Finish" component={CreateSurvey_Finish} />
      <Route path="/Participant_Home" component={Participant_Home} />
      <Route path="/Participant_Step1" component={Participant_Step1} />
      <Route path="/Participant_Step2" component={Participant_Step2} />
      <Route path="/Participant_Step3" component={Participant_Step3} />
      <Route path="/Participant_Step4" component={Participant_Step4} />
      <Route path="/Participant_Step4_test" component={Participant_Step4_test} />
      <Route path="/Participant_Step4_Second" component={Participant_Step4_Second} />
    </Switch>
  )
}

const ProtectedProfile = ({auth,component:Component,...rest}) => {
  return (
    <Route
      {...rest}
      render={() =>auth? (
        <Component/>
      ) :
        (
          <Redirect to='/profile' />
        )}
    />
  )
}

const ProtectedParticipant = ({auth,component:Component,...rest}) => {
  return (
    <Route
      {...rest}
      render={() =>auth? (
        <Component/>
      ) :
        (
          <Redirect to='/Participant_Step1' />
        )}
    />
  )
}

const ProtectedNextPage = ({auth,component:Component,...rest}) => {
  return (
    <Route
      {...rest}
      render={() =>auth? (
        <Component/>
      ) :
        (
          <Redirect to='/nextPage' />
    )}
    />
  )
}

export default App;

// export default class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       signedIn: false
//     };

//   }

//   componentDidMount() {
//     var token;
//     token = localStorage.getItem('ADMIN_TOKEN');
//     if (token) {
//         //store.dispatch({ type: AUTHENTICATE_THE_USER });
//       alert(token)
//     }
//     else{alert("user not signed in")}
//   }

//   render() {
//     return (
//       <MyProvider>
//         <Router basename={window.location.pathname || ""}>
//           <div>
//             <Switch>
//               <Route path="/" exact component={HomePage} />
//               <Route path="/register" component={Registration} />
//               <Route path="/profile" component={Profile} />
//               <Route path="/CreateSurvey_Step1" component={CreateSurvey_Step1} />
//               <Route path="/CreateSurvey_Step2" component={CreateSurvey_Step2} />
//               <Route path="/CreateSurvey_Step3" component={CreateSurvey_Step3} />
//               <Route path="/ManuallStatements" component={ManuallStatements} />
//               <Route path="/UploadStatements" component={UploadStatements} />
//               <Route path="/CreateSurvey_Step4" component={CreateSurvey_Step4} />
//               <Route path="/CreateSurvey_Finish" component={CreateSurvey_Finish} />
//             </Switch>
//           </div>
//         </Router>
//       </MyProvider>
//     );
//   }
// }

// const HomePage = () => (
//   <div>
//     <Home />
//   </div>
// );

