import React, {useState, useContext, useEffect} from 'react';
import { FirebaseContext } from '../Firebase';
import { Welcome as Component } from '.';
import Loader from '../Loader';
import style from './style';

const Welcome = (props) => {
  const firebase = useContext(FirebaseContext);
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState('');

  console.log("Welcome", userData, userSession, userSession === null);

  useEffect(
    () => {
      let listener = firebase.auth.onAuthStateChanged(
        (user) => user ? setUserSession(user) : props.history.push('/')
      );
      
      if(userSession && userSession.uid) {
        firebase.user(userSession.uid)
        .get()
        .then(doc => {
          if(doc && doc.exists) {
            setUserData(doc.data());
          }
        })
        .catch(err => {
          console.log(err);
        });
      }

      return () => {
        listener();
      };

    }, [firebase, props.history, userSession]
  );

  return userSession === null 
  ? <Loader loadingMsg="Chargement" styling={style.loader}/> 
  : <Component userData={userData}/>
};

export default React.memo(Welcome);
