import React from 'react';

const Loader = ({
  loadingMsg,
  styling
}) => {
  
  return (
    <React.Fragment>
      <article className="loader"></article>
      <p style={{textAlign: "center", ...styling}}>
        {loadingMsg}
      </p>
    </React.Fragment>
  );
}

export default Loader;
