import React from 'react';
import style from './style';

const Loader = ({
  loadingMsg,
  styling,
}) => {
  const fullStyle = style[styling];
  return (
    <React.Fragment>
      <article className="loader"></article>
      <p style={fullStyle}>
        {loadingMsg}
      </p>
    </React.Fragment>
  );
}

export default React.memo(Loader);
