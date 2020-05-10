import React, {PureComponent} from 'react';

import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import Question from '../Question';
import QuizOver from '../QuizOver';

import notifs from '../../notifs';
import quizData from '../../contentData';

const initialState = {
  hasBeenWelcomed: false,
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

const levelNames = ["debutant", "confirme", "expert"];

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

  loadQuestions = level => {
    const currentQuiz = quizData.quizz[level];
    this.storedDataRef.current = currentQuiz;

    if (currentQuiz.length >= this.state.maxQuestions) {
      const questions = currentQuiz.map(({answer, ...rest}) => rest);
      this.setState({storedQuestions: questions});
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

    // prepare quiz end data if it is last question
    const endQuizOutput = {};
    if(this.state.questionId === this.state.maxQuestions - 1) {
      endQuizOutput.score = this.getFinalScore(
        currentScore,
        this.state.maxQuestions
      );
      endQuizOutput.isQuizOver = true;
    }

    // update state with computed data
    this.setState(prevState => ({
      succeeds: currentScore,
      questionId: prevState.questionId + 1,
      ...endQuizOutput
    }));

  };

  loadLevel = (incrementLevel) => {
    const newQuizLevel = incrementLevel ? this.state.currentQuizLevel + 1 : 0;
    this.setState({
      ...initialState,
      hasBeenWelcomed: true,
      currentQuizLevel: newQuizLevel
    });


    this.loadQuestions(levelNames[newQuizLevel]);
  };

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.currentQuizLevel]);
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      hasBeenWelcomed,
      maxQuestions,
      storedQuestions,
      questionId,
      succeeds,
    } = this.state;
    const {userData} = this.props;

    // if storedQuestions is updated
    if(storedQuestions !== prevState.storedQuestions) {
      this.setState({
        currentQuestion: storedQuestions[questionId].question,
        questionOptions: storedQuestions[questionId].options
      });
    }

    // if questionId is updated & not the last
    if(questionId !== prevState.questionId && questionId < maxQuestions) {
      this.setState({
        currentQuestion: storedQuestions[questionId].question,
        questionOptions: storedQuestions[questionId].options,
        userAnswer: null,
        isButtonDisabled: true,
      });
    }

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
  };
  
  render() {
    
    console.log("Quiz", this.props.userData);

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
