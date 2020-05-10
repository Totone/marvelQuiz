import React, {useState, useContext} from 'react';
import {FirebaseContext} from '../Firebase';
import {Link} from 'react-router-dom';

const Signup = (props) => {

  const firebase = useContext(FirebaseContext);

  const formData = {
    pseudo: "",
    email: "", 
    password: "", 
    confirmPassword: ""
  };
  const [error, setError] = useState('');

  const [formState, setFormState] = useState(formData);

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

  const inputs = [
    setInputObj("pseudo"),
    setInputObj("email"),
    setInputObj("password"),
    setInputObj("confirmPassword")
  ];

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  const {email, password, pseudo} = formState;

    firebase.signupUser(email, password)
    .then(authUser => {
      return firebase.user(authUser.user.uid).set({
        pseudo, 
        email
      });
    })
    .then(() => {
      setFormState({...formData});
      props.history.push("/welcome");
    })
    .catch(error => {
      setError(error)
    });
  };

  const {pseudo, email, password, confirmPassword} = formState;
  const condition = pseudo === '' 
  || email === '' 
  || password === '' 
  || password !== confirmPassword;

  return (
    <main className="signupLoginBox">
      <section className="slContainer">

        <article className="formBoxLeftSignup">
          
        </article>
        
        <article className="formBoxRight">
          <section className="formContent">
            <form onSubmit={handleFormSubmit}>
              <h2>Inscription</h2>
              {
                error !== "" && <span>{error.message}</span>
              }
              {
                inputs.map((input, index) => (
                  <section key={index} className="inputBox">
                    <input 
                      type={input.type}
                      id={input.id}
                      value={formState[input.id]}
                      onChange={handleFormChange}
                      autoComplete="off"
                      required
                    />
                    <label htmlFor={input.id}>
                      {input.label}
                    </label>
                  </section>
                ))
              }

              <button disabled={condition}>Inscription</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous!</Link>
            </div>
          </section>
        </article>
        
      </section>
    </main>
  );
};

export default Signup;
