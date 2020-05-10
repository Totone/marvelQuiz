import React from 'react';

const ProgressBar = ({
  currentQuestionNb,
  maxQuestions
}) => {
  const percentage = `${currentQuestionNb/maxQuestions*100}%`;
  const questionStr = `Question: ${currentQuestionNb}/${maxQuestions}`;
  const progressionStr = `Progression: ${percentage}`;
  console.log("ProgressBar", percentage);
  return (
    <React.Fragment>
      <section className="percentage">
        <article className="progressPercent">{questionStr}</article>
        <article className="progressPercent">{progressionStr}</article>
      </section>
      <article className="progressBar">
        <section  className="progressBarChange" style={{width: percentage}}/>
      </article>
      
    </React.Fragment>
  );
}

export default React.memo(ProgressBar);
