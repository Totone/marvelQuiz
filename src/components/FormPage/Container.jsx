import React, {useState, useEffect, useContext} from 'react';
import { FirebaseContext } from '../Firebase';

import { FormPage as Component } from '.';
import style from './style';

const FormPage = ({
  formTitle,
  formType,
  inputs,
  bottomLinks,
  ...props
}) => {

  const api = useContext(FirebaseContext);
  const [formState, setFormState] = useState({});
  const [loginErrorMsg, setError] = useState(null);
  const [forgottenPasswordSuccessMsg, setSuccess] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const getInitialFormState = () => {
    const output = {};
    for(const input of inputs) {
      output[input] = "";
    }
    setFormState(output);
  };

  const setFormInputData = inputs => {
    const list = [];

    const addInputData = (str) => {
      const type = str === "pseudo" ? "text" 
        : str === "email" ? "email" 
        : "password";
        let label = "";
    
        for(let i = 0; i < str.length; i++) {
          label += i === 0 ? str[0].toUpperCase()
          : str[i] === str[i].toUpperCase() ? ` ${str[i].toLowerCase()}`
          : str[i];
        }

        list.push({
          id: str,
          type,
          label
        });
    }

    if(Array.isArray(inputs)) {
      for (const input of inputs) {
        addInputData(input);
      };
    } else {
      addInputData(inputs);
    }
    return list;
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmitForget = () => {
    api.resetPassword(formState.email)
    .then(() => {
      setError(null);
      setSuccess(`Consultez votre email ${formState.email} pour remplacer votre mot de passe.`);
      setFormState({email: ''});
    })
    .catch(err => {
      setError(err);
    });
  };

  const handleSubmitLogin = () => {
    const {email, password} = formState;
    console.log(props);
    api.loginUser(email, password)
    .then(() => {
      getInitialFormState();
      props.history.push("/welcome");
    })
    .catch(error => {
      setError(error);
      console.log(error)
    });
  };

  const handleSubmitSignup = () => {
    const {email, password, pseudo} = formState;
    api.signupUser(email, password)
    .then(authUser => {
      return api.user(authUser.user.uid).set({
        pseudo, 
        email
      });
    })
    .then(() => {
      getInitialFormState();
      props.history.push("/welcome");
    })
    .catch(error => {setError(error)});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    switch(formType) {
      case "Forget": return handleSubmitForget();
      case "Login": return handleSubmitLogin();
      case "Signup": return handleSubmitSignup();
      default: return null;
    }
  };
  
  const inputsList = setFormInputData(inputs);
  const leftBoxClass = `formBoxLeft${formType}`; // Login|Signup|Forget
    

  // when formState changes
  useEffect(
    () => {
      const buttonConditions = () => {
        switch(formType) {
          case "Forget": return formState.email === "";
          case "Login": return formState.email === "" || formState.password.length < 6;
          case "Signup": 
            return formState.pseudo === "" 
            || formState.email === "" 
            || formState.password === "" 
            || formState.password !== formState.confirmPassword;
          default: return true;
        }
      };
      if(!isLoading) setButtonDisabled(buttonConditions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState]
  );
    // on component mounting
    useEffect(
      () => {
        getInitialFormState();
        setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []
    );


  return (
    !isLoading &&
    <Component 
      leftBoxClass={leftBoxClass}
      handleFormSubmit={handleFormSubmit}
      formTitle={formTitle} 
      formType={formType}
      forgottenPasswordSuccessMsg={forgottenPasswordSuccessMsg}
      style={style}
      loginErrorMsg={loginErrorMsg}
      inputsList={inputsList}
      formState={formState}
      handleFormChange={handleFormChange}
      isButtonDisabled={isButtonDisabled}
      bottomLinks={bottomLinks}
    />
  );
}

export default React.memo(FormPage);
