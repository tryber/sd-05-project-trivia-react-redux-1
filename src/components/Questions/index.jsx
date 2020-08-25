import React from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import resolveQuestion from '../../services/apiQuestions';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      index: 0,
      disabled: false,
      className: '',
      respostaAPI: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.criarPerguntas = this.criarPerguntas.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentDidMount() {
    resolveQuestion()
      .then((data) => 
      this.setState({
        respostaAPI:data,
      }))
  }

  handleClick() {
    const { index, disabled } = this.state;
    if (index < 4) {
      this.setState({
        index: index + 1,
        disabled: !disabled,
      });
    }
  }

  toggleClass() {
    this.setState({
      disabled: true,
    });
  }

  criarPerguntas() {
    const { respostaAPI } = this.state;
    const { index } = this.state;

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const perguntasCertas = {
      pergunta: respostaAPI.results[index].correct_answer,
      isCorreta: true,
    };
    
    const perguntasErradas = respostaAPI.results[index].incorrect_answers.map(
      (pergunta, index) => ({
        pergunta,
        isCorreta: false,
        index,
      })
    );

    const allQuestions = [...perguntasErradas, perguntasCertas];
    const respostas = shuffle(allQuestions);
    return respostas;
  }

  render() {
    let shuffledQuestions = [];
    const { index, disabled, respostaAPI } = this.state;
    if (!respostaAPI.results) return <h1>Loading...</h1>;
    if (respostaAPI.results.length > 0) {
      shuffledQuestions = this.criarPerguntas();
    }

    return (
      <div>
        <span data-testid="question-category">
          {respostaAPI.results[index].category}
        </span>
        <p data-testid="question-text">{respostaAPI.results[index].question}</p>
        {shuffledQuestions.map((question, index) => (
          <button
            key={index}
            type="button"
            data-testid={
              question.isCorreta
                ? "correct-answer"
                : `wrong-answer-${question.index}`
            }
            className=''
            onClick={this.toggleClass}
            disabled={disabled}
          >
            {question.pergunta}
          </button>
        ))}
        <button disabled={!disabled} type="button" onClick={this.handleClick}>
          Next
        </button>
        {index >= 4 && <Redirect to="/ranking" />}
      </div>
    );
  }
}



export default Questions;
