import React from 'react'
import { connect } from 'react-redux';
import Ranking from '../../components/Ranking';
import './style.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      index: 0,
      respostas: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.criarPerguntas = this.criarPerguntas.bind(this);

  }
  
  handleClick() {
    const { index } = this.state;
    if (index <= 4) {
      this.setState({
        index: index + 1,
      });
    }
  }

  componentDidMount() {
    this.criarPerguntas();
  }
  
  criarPerguntas() {
    const { questions } = this.props;
    if(!questions.results) {
      return <h1>Loading...</h1>
    }
    const { index } = this.state;

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const perguntasCertas = {
      pergunta: questions.results[index].correct_answer,
      isCorreta: true,
    }

     const perguntasErradas = questions.results[index].incorrect_answers.map((pergunta) => ({
      pergunta,
      isCorreta: false,
    }));

    const allQuestions = [{...perguntasErradas}, perguntasCertas];

    const respostas = shuffle(allQuestions);

    return this.setState(respostas);

  }

  render() {
    const { questions } = this.props;
    const { index, respostas } = this.state;
    if(!questions.results) {
      return <h1>Loading...</h1>
    }
    
    
    console.log(respostas)
    
    const wrong_question = questions.results[index].incorrect_answers.map((ans) => ans);
    const right_question = questions.results[index].correct_answer;
    const allQuestions = [...wrong_question, right_question];
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);  
    const shuffledQuestions = shuffle(allQuestions);
    return ( 
      <div>
        <span data-testid="question-category">{questions.results[index].category}</span>
        <p data-testid="question-text">{questions.results[index].question}</p>
        {shuffledQuestions.map((question) => <button>{question}</button>)}
        <button type="button" onClick={this.handleClick}>Next</button>
        {(index >= 4) && <Ranking />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

export default connect(mapStateToProps)(Questions);
