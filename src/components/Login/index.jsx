import React, {useState, useContext, useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import {Link} from 'react-router-dom';

const Login = (props) => {

  const firebase = useContext(FirebaseContext);

  const formData = {
    email: "", 
    password: "", 
  };
  const [cond, setCond] = useState(false);
  const [error, setError] = useState(null);

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
    setInputObj("email"),
    setInputObj("password"),
  ];

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  const {email, password} = formState;

    firebase.loginUser(email, password)
    .then(user => {
      setFormState({...formData});
      props.history.push("/welcome");
    })
    .catch(error => {
      setError(error);
      console.log(error)
    });
  };

  useEffect(()=>{
    const {email, password} = formState;
    setCond(email === '' || password.length < 6);
  }, [formState]);

  return (
    <main className="signupLoginBox">
      <section className="slContainer">

        <article className="formBoxLeftLogin">
          
        </article>
        
        <article className="formBoxRight">
          <section className="formContent">
            <form onSubmit={handleFormSubmit}>
              <h2>Connexion</h2>
              {
                error && <span>{error.message}</span>
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

              <button disabled={cond}>Connexion</button>

            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/forgottenpassword">Mot de passe oublié?</Link>
              <Link className="simpleLink" to="/signup">Nouveau? Inscrivez-vous!</Link>
            </div>
          </section>
        </article>
        
      </section>
    </main>
  );
};

export default Login;
