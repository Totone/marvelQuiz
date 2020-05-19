export default (
  currentPosition,
  maxQuestions
) => {
  const question = `Question: ${currentPosition}/${maxQuestions}`;
  const percentage = `${currentPosition/maxQuestions*100}%`;
  const progression = `Progression: ${percentage}`;

  return {
    question, 
    percentage, 
    progression
  };
};
