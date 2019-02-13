import React from 'react'
import './GameView.scss'
import _ from 'lodash'
import { connect } from 'react-redux'

import { updateGame, finishGame } from '../redux/actions'
import REST from '../../../rest'

const EMPTY_PLACEHOLDER = '';

export class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      attempt: 0,
      disabled: false
    }
  }

  renderWord(word) {
    return (
      <div>
        { _.map(word, (l, i) => { return <span key={i} className="letter">{l}</span> }) }
      </div>
    )
  }

  onInput = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (!value)
      return;

    if (this.state.attempt  >= this.props.maxAttempts) {
      this.setState({
        disabled: true,
        error: false
      })
      return;
    }

    let target = e.target;
    REST.inputGame(this.props.id, value)
    .then(response => {
      if (response.status !== 200)
        throw new Error(response.message);

      response.json()
      .then(data => {
        this.props.updateGame(data.success, data.state)
        if (this.shouldGameBeFinished(data.state, data.attempts)) {
          this.setState({ disabled: true, attempt: data.attempts })
          this.finishGame();
          return;
        }

        if (data.success) {
          this.setState({ disabled: false })
        } else {
          this.setState({ disabled: false, attempt: this.state.attempt + 1 })
        }
        target.select();
      })
    })
    .catch(message => {
      this.setState({error: message})
    })
  }

  shouldGameBeFinished(word, attempts) {
    if (attempts >= this.props.maxAttempts)
      return true;

    if (word.indexOf(EMPTY_PLACEHOLDER) === -1) {
      return true;
    }
    return false;
  }

  finishGame() {
    REST.finishGame(this.props.id)
    .then(response => {
      if (response.status !== 200)
        throw new Error(response.message)

      response.json()
      .then(data => {
        this.props.finishGame(data.solved, data.score)
      });
    })
    .catch(message => {
      this.setState({error: message})
    })
  }

  renderOKorFAIL() {
    if (!_.isBoolean(this.props.success))
      return null;

    if (this.props.success)
      return ( <span className="OK">OK</span> )
    return ( <span className="FAIL">FAIL</span> )
  }

  renderCongrats() {
    if (this.props.active)
      return null;

    if (this.props.solved)
      return ( <div className="OK">You won!</div> )

    return (<div className="FAIL">You lost :(</div>)
  }

  render() {
    return (
      <div>
        <h4>Try to guess the word!</h4>
        <div>Attempts: {this.props.maxAttempts - this.state.attempt}
          { this.renderOKorFAIL() }
        </div> 
        { this.renderCongrats() }
        { this.renderWord(this.props.word) }
        { this.state.error && <div className='error'>{this.state.error}</div> }
        { !this.props.active && <div className="score">Your score is <span>{this.props.score}</span></div>}

        <input className='input' maxLength="1"
          onInput={this.onInput}
          onFocus={(e) => {e.target.select();}}
          autoFocus={true}
          disabled={this.state.disabled}/>
      </div>
    )
  }
}

export default connect(
  state => ({
    id: state.game.id,
    active: state.game.active,
    score: state.game.score, // should be in User 
    solved: state.game.solved,
    success: state.game.success,
    maxAttempts: state.game.maxAttempts,
    word: state.game.word
}), {
  updateGame,
  finishGame
})(GameView)
