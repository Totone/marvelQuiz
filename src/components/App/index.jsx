import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import Landing from '../Landing';
import Header from '../Header';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgottenPassword from '../ForgottenPassword';
import {IconContext} from 'react-icons';

const App = () => {
  return (
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
  );
};

export default App;
