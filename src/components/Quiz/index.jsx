import React, { PureComponent } from 'react';

import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import Question from '../Question';
import QuizOver from '../QuizOver';

import notifs from '../../notifs';
import quizData from '../../contentData';

import { initialState, levelNames } from '../../assets/config/gameManager';


class Quiz extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.storedDataRef = React.createRef(); // Store all quiz data (with answers) in a ref
  }

  getFinalScore = (
    goodAnswersNb,
    maxQuestions
  ) => goodAnswersNb / maxQuestions * 100;

  loadLevel = (incrementLevel) => {
    const newQuizLevel = incrementLevel ? this.state.currentQuizLevel + 1 : 0;
    this.loadQuestions(newQuizLevel);
  };

  loadQuestions = level => {
    const currentQuiz = quizData.quizz[levelNames[level]];
    this.storedDataRef.current = currentQuiz;

    if (currentQuiz.length >= this.state.maxQuestions) {
      const questions = currentQuiz.map(({answer, ...rest}) => rest);
      this.setState({
        ...initialState,
        hasBeenWelcomed: level !== 0,
        currentQuizLevel: level,
        storedQuestions: questions,
        currentQuestion: questions[0].question,
        questionOptions: questions[0].options
      });
    }
  };

  handleOptions = selectedAnswer => {
    this.setState({
      isButtonDisabled: false,
      userAnswer: selectedAnswer
    });
  };

  submitAnswer = () => {
    // compute new user score first by comparison with user current answer & good one
    const goodAnswer = this.storedDataRef.current[this.state.questionId].answer;

    const currentScore = this.state.userAnswer === goodAnswer 
    ? this.state.succeeds + 1
    : this.state.succeeds;

    // prepare quiz end data if it is last question or update questions data
    const outputData = {};
    const currentQuestionId = this.state.questionId;

    if(currentQuestionId === this.state.maxQuestions - 1) {
      outputData.score = this.getFinalScore(
        currentScore,
        this.state.maxQuestions
      );
      outputData.isQuizOver = true;
    }
    else {
      outputData.currentQuestion = this.state.storedQuestions[currentQuestionId +1].question;
      outputData.questionOptions = this.state.storedQuestions[currentQuestionId +1].options;
      outputData.userAnswer = null;
      outputData.isButtonDisabled = true;
    }

    // update state with computed data
    this.setState(prevState => ({
      succeeds: currentScore,
      questionId: prevState.questionId + 1,
      ...outputData
    }));

  };



  componentDidMount() {
    this.loadQuestions(this.state.currentQuizLevel);
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      hasBeenWelcomed,
      questionId,
      succeeds,
    } = this.state;
    const {userData} = this.props;

    // pop up handlers
    if(userData && !hasBeenWelcomed) {
      notifs.welcome(userData.pseudo);
      this.setState({hasBeenWelcomed: true});
    } 

    if(questionId === prevState.questionId +1 ) {
      succeeds > prevState.succeeds
      ? notifs.success() 
      : notifs.failure();
    }

    // const rdm = Math.ceil(Math.random() * 50);

    // for(const [key,] of Object.entries(this.props)) {
    //   prevState[key] !== this.state[key] && console.log("updtP",rdm,": changement de ", key, ":", prevState[key], this.state[key]);
    // }

    // for(const [key,] of Object.entries(this.state)) {
    //   prevState[key] !== this.state[key] && console.log("updtS",rdm,": changement de ", key, ":", prevState[key], this.state[key]);
    // }
  };
  
  render() {
    
    console.log("Quiz in render()");

    const {
      currentQuizLevel,
      maxQuestions,
      currentQuestion,
      questionOptions,
      questionId,
      isButtonDisabled,
      userAnswer,
      succeeds,
      isQuizOver,
      score,
      minScore,
    } = this.state;

    return isQuizOver ? (
      <QuizOver
        ref={this.storedDataRef}
        succeeds={succeeds}
        score={score}
        maxQuestions={maxQuestions}
        isLastLevel={currentQuizLevel === levelNames.length -1}
        loadLevel={this.loadLevel}
        isSucceeded={score >= minScore}
      />
    ):(
      <React.Fragment>
        <Levels 
          levelNames={levelNames}
          currentLevel={currentQuizLevel}
        />
        <ProgressBar
          currentQuestionNb={questionId + 1}
          maxQuestions={maxQuestions}
        />
        <Question 
          label={currentQuestion}
          options={questionOptions}
          isButtonDisabled={isButtonDisabled}
          userAnswer={userAnswer}
          handleOptions={this.handleOptions}
          submitAnswer={this.submitAnswer}
        />
      </React.Fragment>
    );
  }
};

export default Quiz;
