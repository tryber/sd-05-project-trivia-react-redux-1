import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getScore } from '../../redux/actions/actionScore';
import placar from '../../services/scoreCalculation';

function classChoose(disabled, isCorreta) {
  let classe = '';
  if (disabled && isCorreta) {
    classe = 'green-border';
  } else if (disabled && !isCorreta) {
    classe = 'red-border';
  } else {
    classe = '';
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
      className: '',
      time: 30,
      timer: null,
      score: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.criarPerguntas = this.criarPerguntas.bind(this);
  }

  componentDidMount() {
    const timer = setInterval(this.timerCount, 1000);
    this.stateFunc(timer);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  stateFunc(timer) {
    this.setState({
      timer,
    });
  }

  timerCount() {
    const { timer, time } = this.state;
    if (time === 0) {
      clearInterval(timer);
      this.setState({
        time: 0,
        disabled: true,
      });
    } else {
      this.setState({ time: time - 1 });
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
    this.setState({
      randomize: false,
      RQ: respostas,
      diff: respostaAPI[index].difficulty,
    });
    return respostas;
  }

  handleClick() {
    const { index } = this.state;
    if (index <= 4) {
      this.setState({
        index: index + 1,
        disabled: false,
        time: 30,
        randomize: true,
        timer: setInterval(this.timerCount, 1000),
      });
    }
  }

  toggleClass(e) {
    const { pName, pEmail, setScore } = this.props;
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const { name } = e.target;
    const { timer, time, diff, score } = this.state;
    clearInterval(timer);
    this.setState({
      disabled: true,
    });

    if (name === 'correta') {
      setScore(placar(time, diff) + score);
      this.setState({
        score: placar(time, diff) + score,
      });
      const newState = {
        player: {
          name: pName,
          email: pEmail,
          assertions: playerInfo.player.assertions + 1,
          score: placar(time, diff) + score,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
  }
  
  render() {
    let shuffledQuestions = [];
    const { respostaAPI } = this.props;
    const { disabled, index, time, RQ, randomize } = this.state;
    if (index > 4) return <Redirect to="/ranking" />;
    if (respostaAPI.length < 1) return <h1>Loading...</h1>;
    if (randomize) { shuffledQuestions = this.criarPerguntas(); } else { shuffledQuestions = RQ; }
    return (
      <div>
        <span data-testid="question-category"> {respostaAPI[index].category} </span>
        <p data-testid="question-text">{respostaAPI[index].question}</p>
        {shuffledQuestions.map((question) => (
          <button
            key={Math.random(99999999)} type="button"
            name={question.isCorreta ? 'correta' : 'errada'}
            data-testid={question.isCorreta ? 'correct-answer' : `wrong-answer-${question.index}`}
            className={classChoose(disabled, question.isCorreta)}
            onClick={(e) => this.toggleClass(e)} disabled={disabled}
          > {question.pergunta} </button>
        ))}
        {disabled && (
          <button
            disabled={!disabled} data-testid="btn-next" type="button" onClick={this.handleClick}
          >
            {' '}
            Next{' '}
          </button>
        )}
        {time}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setScore: (e) => dispatch(getScore(e)),
});

const mapStateToProps = (state) => ({
  pName: state.loginReducer.name,
  pEmail: state.loginReducer.email,
});

Button.propTypes = {
  respostaAPI: PropTypes.arrayOf(PropTypes.object).isRequired,
  setScore: PropTypes.func.isRequired,
  pName: PropTypes.string.isRequired,
  pEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
