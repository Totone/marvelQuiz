import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

export const FormPage = ({
  leftBoxClass,
  handleFormSubmit,
  formTitle, 
  formType,
  forgottenPasswordSuccessMsg,
  style,
  loginErrorMsg,
  inputsList,
  formState,
  handleFormChange,
  isButtonDisabled,
  bottomLinks,
}) => {
  return (
    <main className="signupLoginBox">
      <section className="slContainer">

        <article className={leftBoxClass}></article>
        
        <article className="formBoxRight">
          <section className="formContent">
            <form onSubmit={handleFormSubmit}>
              <h2>{formTitle}</h2>
              {
                formType === "Forget" && forgottenPasswordSuccessMsg 
                ? <span style={style.success}>{forgottenPasswordSuccessMsg}</span>
                : (
                  <React.Fragment>
                    {
                      loginErrorMsg && <span>{loginErrorMsg.message}</span>
                    }
                    {
                      inputsList.map((input, index) => (
                        <section key={`inputsList-${index}`} className="inputBox">
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
      
                    <button disabled={isButtonDisabled}>Envoyer</button>
                  </React.Fragment>
                )
              }
            </form>

            <div  className="linkContainer">
              {
                bottomLinks.map(
                  (link, index) => (
                    <p key={`bottomLinks-${index}`}>
                      <Link
                        className="simpleLink"
                        to={link.href}
                      >
                        {link.label}
                      </Link>
                    </p>
                  )
                )
              }
            </div>
          
          </section>
        </article>
        
      </section>
    </main>
  );
}

export default React.memo(Container);
