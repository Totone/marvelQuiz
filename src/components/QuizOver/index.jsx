import React from 'react';
import Loader from '../Loader';
import Modal from '../Modal';
import Container from './Container';
import AskedQuestionsList from './AskedQuestionsList';

const SuccessButton = ({
  isSucceeded,
  loadLevel,
  label
}) => (
  <React.Fragment>
  {
    isSucceeded && (
      <button 
        className="btnResult success"
        onClick={loadLevel}
      >
        {label}
      </button>
    )
  }
  </React.Fragment>
);

export const QuizOver = ({
  isSucceeded,
  loadLevel,
  askedQuestions,
  showModal,
  isModalOpen,
  isDataLoading,
  hideModal,
  characterData,
  labels
}) => {
  return (
    <React.Fragment>
      <section className="stepsBtnContainer">
        <p className="successMsg">{labels.feedback}</p>
        <SuccessButton 
          isSucceeded={isSucceeded}
          loadLevel={loadLevel}
          label={labels.button}
        />
      </section>

      <section className="percentage">
        <article className="progressPercent">
          {labels.successPercentage}
        </article>
        <article className="progressPercent">
          {labels.grade}
        </article>
      </section>
      
      <hr/>
      
      <p>{labels.answersHeader}</p>

      <article className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>{labels.questions}</th>
              <th>{labels.answers}</th>
              <th>{labels.data}</th> 
            </tr>
          </thead>
          <tbody>
            {
              isSucceeded ? (
                <AskedQuestionsList 
                  askedQuestions={askedQuestions}
                  showModal={showModal}
                  dataLabel={labels.data}
                />
              ):(
                <tr>
                  <td colSpan="3">
                    <Loader 
                      loadingMsg={labels.loader}
                      styling="quizEndFailure"
                    />
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </article>

      {
        isModalOpen && (
          <Modal 
            isDisplayed={!isDataLoading}
            hide={hideModal}
            data={characterData.data && characterData.data.results[0]}
            attributionText={characterData.attributionText}
          />
        )
      }

    </React.Fragment>
  );
};

export default React.memo(Container);
