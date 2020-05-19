import React, {useState, useEffect} from 'react';
import { QuizOver as Component } from '.';
import getMarvelApiData from '../../services/marvelAPI';
import {
  checkStoredDataAge,
  getDataFromLS,
  isDataInLS,
  setDataToLS
} from '../../services/storage';

import locales from './locales';

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
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
  
  const showModal = (id) => async() => {
    setModalOpen(true);

    const updateData = (id) => {
      setCharacterData(id);
      setDataLoading(false);
    };

    try {
      const newData = isDataInLS(id) 
      ? getDataFromLS(id) 
      : await getMarvelApiData(id);
      
      !isDataInLS(id) && setDataToLS(id, newData);
      updateData(newData);
    }
    catch(e) {
      console.trace(e)
    }
  };

  const hideModal = () => {
    setModalOpen(false);
    setDataLoading(true);
  };

  useEffect(() => {
    setAsked(ref.current);
    checkStoredDataAge();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labels = () => ({
    ...locales.table,
    successPercentage: locales.getSuccessPercentage(score),
    grade: locales.getGrade(succeeds, maxQuestions),
    feedback: locales.getFeedback(isSucceeded, isLastLevel),
    answersHeader: locales.answersHeader,
    loader: locales.loader,
    button: locales.getButton(isLastLevel)
  });

  return (
    <Component 
      isSucceeded={isSucceeded}
      loadLevel={() => loadLevel(!isLastLevel)}
      askedQuestions={asked}
      showModal={showModal}
      isModalOpen={isModalOpen}
      isDataLoading={isDataLoading}
      hideModal={hideModal}
      characterData={characterData}
      labels={labels()}
    />
  );
});

export default React.memo(QuizOver);
