import React from 'react';

import getLocales from './locales';
import getStyle from './style';

const ProgressBar = ({
  currentQuestionNb,
  maxQuestions
}) => {
  const {
    percentage,
    question,
    progression
  } = getLocales(currentQuestionNb, maxQuestions);
  const style = getStyle(percentage);
  
  return (
    <React.Fragment>

      <section className="percentage">
        <article className="progressPercent">{question}</article>
        <article className="progressPercent">{progression}</article>
      </section>
    
      <article className="progressBar">
        <section 
          className="progressBarChange" 
          style={style}
        />
      </article>
    
      </React.Fragment>
  );
}

export default React.memo(ProgressBar);
