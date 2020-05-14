import React from 'react';

import Logout from '../../components/Logout';
import Quiz from '../../components/Quiz';
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
