import React from 'react';
import FormPage from '../../components/FormPage';

const ForgottenPassword = (
  (props) => (
    <FormPage
      {...props}
      formType="Forget"
      formTitle="Mot de passe oublié?"
      inputs={["email"]}
      bottomLinks={[
        {
          href: "/signup",
          label: "Nouveau? Inscrivez-vous!"
        }
      ]}
    />
  )
);

export default ForgottenPassword;
