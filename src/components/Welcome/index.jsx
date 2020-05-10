import React, {useState, useContext, useEffect} from 'react';
import Loader from '../Loader';

import {FirebaseContext} from '../Firebase';

import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = (props) => {

  const firebase = useContext(FirebaseContext);
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState('');

  console.log("Welcome", userData);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged(
      user => {
        user ? setUserSession(user) : props.history.push('/');
      }
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  return userSession === null ? (
    <React.Fragment>
      <Loader
        loadingMsg="Chargement"
        styling={{
          color: "red",
          fontWeight: "bold"
        }}
      />
    </React.Fragment>
  ):(
    <main className="quiz-bg">
      <section className="container">
        <Logout/>
        <Quiz userData={userData}/>
      </section>  
    </main>
  );
};

export default React.memo(Welcome);
