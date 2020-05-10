import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from '../Firebase';
import Tooltip from 'react-tooltip';

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if(checked) {
      firebase.signoutUser();
    }
  },[checked, firebase]);

  return (
    <article className="logoutContainer">
      <label className="switch">
        <input type="checkbox" onChange={handleChange} value={checked}/>
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
      <Tooltip 
        place="left"
        effect="solid"
      />
    </article>
  );
};

export default Logout;
