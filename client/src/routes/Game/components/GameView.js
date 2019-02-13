import React from 'react'
import './GameView.scss'
import _ from 'lodash'
import { connect } from 'react-redux'

import { updateGame, finishGame } from '../redux/actions'
import REST from '../../../rest'

export class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    if (this.state.attempt >= this.props.maxAttempts) {
      this.setState({ disabled: true })
      return;
    }

    this.setState({ disabled: true })
    REST.inputGame(this.props.id, value)
    .then(response => {
      if (response.status !== 200)
        throw new Error(response.message);

      response.json()
      .then(data => {
        this.props.updateGame(data.success, data.state)
        if (data.success) {
          this.setState({ disabled: false })
        } else {
          this.setState({ disabled: false, attempt: this.state.attempt + 1 })
        }
      })
    })
    .catch(message => {})
  }

  render() {
    return (
      <div>
        <h4>Try to guess the word!</h4>
        <div>Attempts: {this.props.maxAttempts - this.state.attempt}</div> 
        { this.renderWord(this.props.word) }
        <input className='input' maxLength="1"
          onInput={this.onInput}
          onFocus={(e) => {e.target.select();}}
          disabled={this.state.disabled}/>
      </div>
    )
  }
}

export default connect(
  state => ({
    id: state.game.id,
    success: state.game.success,
    maxAttempts: state.game.maxAttempts,
    word: state.game.word
}), {
  updateGame,
  finishGame
})(GameView)
