import React, {useState, useEffect, useContext} from 'react';
import {BackendContext} from '../../services/backend';
import Tooltip from 'react-tooltip';

import locales from './locales';

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const backend = useContext(BackendContext);
  const {logout} = locales;

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if(checked) {
      backend.signoutUser();
    }
  },[checked, backend]);

  return (
    <article className="logoutContainer">
      <label className="switch">
        <input type="checkbox" onChange={handleChange} value={checked}/>
        <span className="slider round" data-tip={logout}></span>
      </label>
      <Tooltip 
        place="left"
        effect="solid"
      />
    </article>
  );
};

export default React.memo(Logout);
