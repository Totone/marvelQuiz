import React, {useState, useEffect, useRef} from 'react';
import { Landing as Component } from './';

const Landing = () => {
  const [btns, setBtns] = useState(false);
  const refClaws = useRef(null);
  const links = [
    {
      href: "/signup",
      className: "leftBox",
      label: "Inscription"
    },{
      href: "/login",
      className: "rightBox",
      label: "Connexion"
    }
  ];

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

  /** Claws animation on component mounting */
  useEffect(
    () => {
      refClaws.current.classList.add("startingImg");

      setTimeout(
        () => {
          refClaws.current.classList.remove("startingImg");
          setBtns(true);
        }, 1000
      );
    }, []
  );

  return (
    <Component
      refClaws={refClaws}
      btns={btns}
      setClaws={setClaws}
      removeClaws={removeClaws} 
      links={links}
    />
  );
}

export default React.memo(Landing);
