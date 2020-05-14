import React from 'react';
import FormPage from '../../components/FormPage';

export default React.memo(
  (props) => (
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
  )
);
