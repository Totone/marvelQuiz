import React from 'react';

import Logout from '../Logout';
import Quiz from '../Quiz';
import Container from './Container';

export const Welcome = ({
  userData
}) => {
  return (
    <main className="quiz-bg">
      <article className="container">
        <Logout/>
        <Quiz userData={userData}/>
      </article>
    </main>
  );
};

export default React.memo(Container);
