import React from 'react';
import FormPage from '../FormPage';

export default React.memo(
  (props) => (
    <FormPage
      {...props}
      formType="Login"
      formTitle="Connexion"
      inputs={["email", "password"]}
      bottomLinks={[
        {
          href: "/signup",
          label: "Nouveau? Inscrivez-vous!"
        },{
          href: "/forgottenpassword",
          label: "Mot de passe oublié?"
        }
      ]}
    />
  )
);
