import React, {useState, useEffect} from 'react';
import { QuizOver as Component } from '.';
import getMarvelApiData from '../../services/marvelAPI';
import {
  checkStoredDataAge,
  getDataFromLS,
  isDataInLS,
  setDataToLS
} from '../../services/storage';

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [characterData, setCharacterData] = useState([]);
  const [isDataLoading, setDataLoading] = useState(true);

  const {
    score,
    succeeds,
    maxQuestions,
    isLastLevel,
    loadLevel,
    isSucceeded
  } = props;
  
  const success = `Réussite: ${score}%`;
  const note = `Note: ${succeeds}/${maxQuestions}`;

  const showModal = (id) => () => {
    setModalOpen(true);

    const updateData = (id) => {
      setCharacterData(id);
      setDataLoading(false);
    };

    isDataInLS(id) 
    ? updateData( getDataFromLS(id) ) 
    : getMarvelApiData(
      id,
      (res) => {
        setDataToLS(id, res.data);
        updateData(res.data)
      }
    );
  };

  const hideModal = () => {
    setModalOpen(false);
    setDataLoading(true);
  };

  useEffect(() => {
    setAsked(ref.current);
    setMessage(
      ! isSucceeded ? "Vous avez échoué..."
      : isLastLevel ? "Bravo, vous avez réussi tous les niveaux!"
      : "Bravo, vous avez réussi le niveau!"
    );
    checkStoredDataAge();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Component 
      isLastLevel={isLastLevel}
      isSucceeded={isSucceeded}
      message={message}
      loadLevel={() => loadLevel(!isLastLevel)}
      success={success}
      note={note}
      askedQuestions={asked}
      showModal={showModal}
      isModalOpen={isModalOpen}
      isDataLoading={isDataLoading}
      hideModal={hideModal}
      characterData={characterData}
    />
  );
});

export default React.memo(QuizOver);
