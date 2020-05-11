import React from 'react';
import getStyle from './style';

const ProgressBar = ({
  currentQuestionNb,
  maxQuestions
}) => {
  const percentage = `${currentQuestionNb/maxQuestions*100}%`;
  const questionStr = `Question: ${currentQuestionNb}/${maxQuestions}`;
  const progressionStr = `Progression: ${percentage}`;
  const style = getStyle(percentage);
  console.log("ProgressBar", percentage);
  return (
    <React.Fragment>
      <section className="percentage">
        <article className="progressPercent">{questionStr}</article>
        <article className="progressPercent">{progressionStr}</article>
      </section>
      <article className="progressBar">
        <section  className="progressBarChange" style={style}/>
      </article>
      
    </React.Fragment>
  );
}

export default React.memo(ProgressBar);
