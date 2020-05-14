import React from 'react';
import Loader from '../Loader';
import Modal from '../Modal';
import {GiTrophyCup} from 'react-icons/gi';
import Container from './Container';

export const QuizOver = ({
  isLastLevel,
  isSucceeded,
  message,
  loadLevel,
  success,
  note,
  askedQuestions,
  showModal,
  isModalOpen,
  isDataLoading,
  hideModal,
  characterData
}) => {
  return (
    <React.Fragment>
      <section className="stepsBtnContainer">
        <p className="successMsg">
          {isLastLevel && isSucceeded && <GiTrophyCup size="50px"/>}{message}
        </p>
        {
          isSucceeded && (
            <button 
              className="btnResult success"
              onClick={loadLevel}
            >
              {`${isLastLevel ? "Recommencer" : "Niveau suivant"}`}
            </button>
          )
        }
      </section>
      <section className="percentage">
        <article className="progressPercent">{success}</article>
        <article className="progressPercent">{note}</article>
      </section>
      <hr/>
      <p>Les réponses aux questions:</p>

      <article className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th> 
            </tr>
          </thead>
          <tbody>
            {
              isSucceeded ? (
                askedQuestions.map(
                  current => (
                    <tr key={current.id}>
                      <td>{current.question}</td>
                      <td>{current.answer}</td>
                      <td><button className="btnInfo" onClick={showModal(current.heroId)}>Infos</button></td>
                    </tr>
                  )
                )
              )
              : (
                <tr>
                  <td colSpan="3">
                    <Loader 
                      loadingMsg="Vous verrez les réponses lorsque vous aurez au moins réussi la moitié du test!"
                      styling={{textAlign:"center", color: "red"}}
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
