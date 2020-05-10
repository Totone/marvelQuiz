import React, {useRef, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
  const [btns, setBtns] = useState(false);
  const refClaws = useRef(null);

  useEffect(() => {
    refClaws.current.classList.add("startingImg");

    setTimeout(() => {
      refClaws.current.classList.remove("startingImg");
      setBtns(true);
    }, 1000);
  }, []);

  const setClaws = e => {
    if(e.target.classList.contains("leftBox") || e.target.textContent === "Inscription") {
      refClaws.current.classList.add("leftImg");
    }
    else if(e.target.classList.contains("rightBox") || e.target.textContent === "Connexion") {
      refClaws.current.classList.add("rightImg");
    }
  };

  const removeClaws = e => {
    if(refClaws.current.classList.contains("leftImg")) {
      refClaws.current.classList.remove("leftImg")
    }
    else if(refClaws.current.classList.contains("rightImg")) {
      refClaws.current.classList.remove("rightImg")
    }
  };

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

export default Landing;
