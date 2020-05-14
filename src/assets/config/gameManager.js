export const initialState = {
  currentQuizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  currentQuestion: null,
  questionOptions: [],
  questionId: 0,
  isButtonDisabled: true,
  userAnswer: null,
  succeeds: 0,
  
  isQuizOver: false,
  score: null,
  minScore: 50,
};

export const levelNames = ["debutant", "confirme", "expert"];
