import React from 'react';
import FormPage from '../FormPage';

export default (props) => (
  <FormPage
    {...props}
    formType="Signup"
    formTitle="Inscription"
    inputs={["pseudo","email","password","confirmPassword"]}
    bottomLinks={[
      {
        href: "/login",
        label: "Déjà inscrit? Connectez-vous!"
      }
    ]}
  />
);