import React from 'react';
import {Link} from 'react-router-dom';
import Container from './Container';

export const Landing = ({
  refClaws,
  btns,
  setClaws,
  removeClaws,
  links
}) => {
  return (
    <main ref={refClaws} className="welcomePage">
      {
        btns && (
          <React.Fragment>
            {
              links.map(
                (link, index) => (
                  <section
                    key={`landingLink-${index}`} 
                    onMouseOver={setClaws}
                    onMouseOut={removeClaws}
                    className={link.className}
                  >
                    <Link to={link.href} className="btn-welcome">
                      {link.label}
                    </Link>
                  </section>
                )
              )
            }
          </React.Fragment>
        )
      }
    </main>
  );
};

export default React.memo(Container);
