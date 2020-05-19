import React from 'react';
import {GiTrophyCup} from 'react-icons/gi';

export default {
  table: {
    questions: "Questions",
    answers: "Réponses",
    data: "Infos"
  },
  answersHeader: "Les réponses aux questions:",
  loader: "Vous verrez les réponses lorsque vous aurez au moins réussi la moitié du test!",
  getButton: (isLastLevel) => isLastLevel ? "Recommencer" : "Niveau suivant",
  getSuccessPercentage: (score) => `Réussite: ${score}%`,
  getGrade: (succeeds, maxQuestions) => `Note: ${succeeds}/${maxQuestions}`,
  getFeedback: (isSucceeded, isLastLevel) => {
    const label = ! isSucceeded ? "Vous avez échoué..."
    : isLastLevel ? "Bravo, vous avez réussi tous les niveaux!"
    : "Bravo, vous avez réussi le niveau!";
    return (
      <React.Fragment>
        {isLastLevel && isSucceeded && <GiTrophyCup size="50px"/>}{label}
      </React.Fragment>
    );
  },
};
