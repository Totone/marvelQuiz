import React from 'react';
import style from './style';
import batman from '../../assets/images/batman.png';
import labels from './locales';

const ErrorPage = () => {
  return (
    <main className="quiz-bg">
      <section className="container">
        <h2 style={style.centerH2}>
          {labels.errorMessage}
        </h2>
        <img 
          style={style.centerImg}
          src={batman}
          alt={labels.errorAlt}
        />
      </section>
    </main>
  );
};

export default React.memo(ErrorPage);
