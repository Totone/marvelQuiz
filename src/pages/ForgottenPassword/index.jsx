import React from 'react';
import FormPage from '../../components/FormPage';

export default React.memo(
  (props) => {
    const bottomLinksLabels = ["login"];
    return (
      <FormPage
        {...props}
        type="forget"
        bottomLinksLabels={bottomLinksLabels}
      />
    )
  }
);
