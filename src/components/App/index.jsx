import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// Contexts
import Backend, {BackendContext} from '../../services/backend';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

// Components
import Landing from '../../pages/Landing';
import Header from '../../pages/Header';
import Footer from '../../pages/Footer';
import Welcome from '../../pages/Welcome';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import ErrorPage from '../../pages/ErrorPage';
import ForgottenPassword from '../../pages/ForgottenPassword';
import {IconContext} from 'react-icons';

const App = () => {
  return (
    <BackendContext.Provider value={new Backend()}>
      <Router>
        <IconContext.Provider value={{style: {verticalAlign: "middle"}}}>
          <Header/>
          <ToastContainer/>

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/forgottenpassword" component={ForgottenPassword} />
            <Route component={ErrorPage} />
          </Switch>
          
          <Footer/>
        </IconContext.Provider>
      </Router>
    </BackendContext.Provider>
  );
};

export default React.memo(App);
