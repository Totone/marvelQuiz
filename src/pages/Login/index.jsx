import React from 'react';
import FormPage from '../../components/FormPage';

export default React.memo(
  (props) => {    
    const bottomLinksLabels = ["signup", "forget"];
    return (
      <FormPage
        {...props}
        type="login"
        bottomLinksLabels={bottomLinksLabels}
      />
    );
  }
);
