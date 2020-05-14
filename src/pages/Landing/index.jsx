import React from 'react';
import {Link} from 'react-router-dom';
import Container from './Container';

export const Landing = ({
  refClaws,
  btns,
  setClaws,
  removeClaws
}) => {
  return (
    <main ref={refClaws} className="welcomePage">
      {
        btns && (
          <React.Fragment>
            <section onMouseOver={setClaws} onMouseOut={removeClaws} className="leftBox">
              <Link to="/signup" className="btn-welcome">Inscription</Link>
            </section>
            <section onMouseOver={setClaws} onMouseOut={removeClaws} className="rightBox">
              <Link to="login" className="btn-welcome">Connexion</Link>
            </section>
          </React.Fragment>
        )
      }
    </main>
  );
};

export default React.memo(Container);
