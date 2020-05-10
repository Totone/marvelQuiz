import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../Firebase';

const ForgottenPassword = () => {

  const firebase = useContext(FirebaseContext);
  const [formState, setFormState] = useState({
    email: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const setInputObj = str => {
    const type = str === "pseudo" ? "text" : str === "email" ? "email" : "password";
    let label = "";

    for(let i = 0; i < str.length; i++) {
      if (i === 0) {
        label += str[0].toUpperCase();
      } else {
        label += str[i] === str[i].toUpperCase() ? ` ${str[i].toLowerCase()}`:str[i];
      }
    }
    
    return {
      id: str,
      type,
      label
    };
  }

  const inputs = [setInputObj('email')];

  const successStyle = {
    border: "1px solid green",
    background: "green",
    color: "#FFFFFF"
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    firebase.resetPassword(formState.email)
    .then(() => {
      setError(null);
      setSuccess(`Consultez votre email ${formState.email} pour remplacer votre mot de passe.`);
      setFormState({email: ''});
    })
    .catch(err => {
      setError(err);
    })
  };
  const isButtonDisabled = formState.email === '';
  
  return (
    <main className="signupLoginBox">
      <section className="slContainer">

        <article className="formBoxLeftForget"></article>
        
        <article className="formBoxRight">
          <section className="formContent">
            <form onSubmit={handleFormSubmit}>
              <h2>Mot de passe oublié?</h2>
              {
                success ? <span style={successStyle}>{success}</span>: (
                  <React.Fragment>
                    {
                      error && <span>{error.message}</span>
                    }
                    {
                      inputs.map(input => (
                        <section className="inputBox">
                          <input 
                            type={input.type}
                            id={input.id}
                            value={formState[input.id]}
                            onChange={handleFormChange}
                            autocomplete="off"
                            required
                          />
                          <label htmlFor={input.id}>
                            {input.label}
                          </label>
                        </section>
                      ))
                    }
      
                    <button disabled={isButtonDisabled}>Envoyer</button>
                  </React.Fragment>
                )
              }
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">Nouveau? Inscrivez-vous!</Link>
            </div>
          </section>
        </article>
        
      </section>
    </main>
  );
};

export default ForgottenPassword;
