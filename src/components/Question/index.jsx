import React from 'react';
import {FaChevronCircleRight} from 'react-icons/fa';

const Question = ({
  label,
  options,
  isButtonDisabled,
  handleOptions,
  userAnswer,
  submitAnswer
}) => {
  const isSelected = (option) => option === userAnswer ? "selected" : null;
  console.log("Question");
  return (
    <React.Fragment>
      <h2>{label}</h2>
      {
        options.map((option, index) => (
        <p 
          key={index}
          onClick={() => handleOptions(option)}
          className={`answerOptions ${isSelected(option)}`}
        >
          <FaChevronCircleRight/> {option}
        </p>
        ))
      }

      <button
        disabled={isButtonDisabled}
        className="btnSubmit"
        onClick={submitAnswer}
      >
        Suivant
      </button>
    </React.Fragment>
  );
}

export default React.memo(Question);
