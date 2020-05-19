import React from 'react';
import Container from './Container';
import FormInput from './FormInput';
import BottomLink from './BottomLink';

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
                      inputsList.map(
                        (input, index) => (
                          <FormInput
                            key={`inputsList-${index}`}
                            handleFormChange={handleFormChange}
                            formState={formState}
                            input={input}
                          />
                        )
                      )
                    }
      
                    <button disabled={isButtonDisabled}>Envoyer</button>
                  </React.Fragment>
                )
              }
            </form>

            <div className="linkContainer">
              {
                bottomLinks.map(
                  (link, index) => (
                    <BottomLink 
                      key={`bottomLinks-${index}`}
                      link={link}
                    />
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
