import {useState, useEffect, useContext} from 'react';
import { BackendContext } from '../../services/backend';

export default (formType, inputs) => {
  const backend = useContext(BackendContext);
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

  return {
    backend,
    setError,
    formState,
    isLoading,
    setSuccess,
    setFormState,
    loginErrorMsg, 
    isButtonDisabled,
    getInitialFormState,
    forgottenPasswordSuccessMsg
  };
};
