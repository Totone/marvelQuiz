import React, {useState, useContext, useEffect} from 'react';
import { BackendContext } from '../../services/backend';
import { Welcome as Component } from '.';
import Loader from '../../components/Loader';
import style from './style';

const Welcome = (props) => {
  const backend = useContext(BackendContext);
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState('');

  useEffect(
    () => {
      let listener = backend.auth.onAuthStateChanged(
        (user) => user ? setUserSession(user) : props.history.push('/')
      );
      
      if(userSession && userSession.uid) {
        backend.user(userSession.uid)
        .get()
        .then(doc => {
          if(doc && doc.exists) {
            setUserData((doc.data()));
          }
        })
        .catch(err => {
          console.log(err);
        });
      }

      return () => {
        listener();
      };

    }, [backend, props.history, userSession]
  );

  return userData === '' || userSession === null 
  ? <Loader loadingMsg="Chargement" styling={style.loader}/> 
  : <Component userData={userData}/>
};

export default React.memo(Welcome);
