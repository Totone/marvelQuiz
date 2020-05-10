import React from 'react';
import style from './style';
import batman from '../../images/batman.png';

const ErrorPage = () => {
  return (
    <main className="quiz-bg">
      <section className="container">
        <h2 style={style.centerH2}>Oups, cette page n'existe pas!</h2>
        <img 
          style={style.centerImg}
          src={batman}
          alt="Error page"
        />
      </section>
    </main>
  );
};

export default ErrorPage;
