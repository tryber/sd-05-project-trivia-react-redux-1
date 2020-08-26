import React, { Component } from "react";
import { Redirect } from "react-router-dom";

function classChoose(disabled, isCorreta) {
  let classe = "";
  if (disabled && isCorreta) {
    classe = "green-border";
  } else if (disabled && !isCorreta) {
    classe = "red-border";
  } else {
    classe = "";
  }
  return classe;
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      randomize: true,
      disabled: false,
      className: "",
      time: 30,
      timer:null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.criarPerguntas = this.criarPerguntas.bind(this);
  }

  componentDidMount() {
    const timer = setInterval(this.timerCount, 1000);
    this.setState({
      timer,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  
  timerCount() {
    const { timer, time } = this.state;
    if (time === 0) {
      clearInterval(timer);
      this.setState({
        time:0,
        disabled:true,
      })
    } else {
      this.setState({ time: time - 1});
    }
  }

  criarPerguntas() {
    const { respostaAPI } = this.props;
    const { index } = this.state;

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const perguntasCertas = {
      pergunta: respostaAPI[index].correct_answer,
      isCorreta: true,
    };

    const perguntasErradas = respostaAPI[index].incorrect_answers.map(
      (pergunta, indexs) => ({
        pergunta,
        isCorreta: false,
        index: indexs,
      }),
    );

    const allQuestions = [...perguntasErradas, perguntasCertas];
    const respostas = shuffle(allQuestions);
    this.setState ({
      randomize:false,
      RQ: respostas,
    })
    return respostas;
  }

  handleClick() {
    const { index, timer } = this.state;
    if (index < 4) {
      this.setState({
        index: index + 1,
        disabled: false,
        time: 30,
        randomize: true,
        timer: setInterval(this.timerCount, 1000),
      });
    }
  }

  toggleClass() {
    const { timer } = this.state;
    clearInterval(timer);
    this.setState({
      disabled: true,
    });
  }

  render() {
    let shuffledQuestions = [];
    const { respostaAPI } = this.props;
    const { disabled, index, time, RQ, randomize } = this.state;
    if (respostaAPI.length < 1) return <h1>Loading...</h1>;
    if (randomize) {
      shuffledQuestions = this.criarPerguntas();
    } else {
      shuffledQuestions = RQ;
    }
    
    return (
      <div>
        <span data-testid="question-category">
          {respostaAPI[index].category}
        </span>
        <p data-testid="question-text">{respostaAPI[index].question}</p>
        {shuffledQuestions.map((question) => (
          <button
            key={Math.random(99999999)}
            type="button"
            data-testid={
              question.isCorreta
                ? "correct-answer"
                : `wrong-answer-${question.index}`
            }
            className={classChoose(disabled, question.isCorreta)}
            onClick={this.toggleClass}
            disabled={disabled}
          >
            {question.pergunta}
          </button>
        ))}
        {disabled && (
          <button disabled={!disabled} type="button" onClick={this.handleClick}>
            {" "}
            Next{" "}
          </button>
        )}
        {time}
        {index >= 4 && <Redirect to="/ranking" />}
      </div>
    );
  }
}

export default Button;
