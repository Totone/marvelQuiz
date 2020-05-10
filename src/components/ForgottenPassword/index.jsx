import React from 'react';
import FormPage from '../FormPage';

export default (props) => (
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
);