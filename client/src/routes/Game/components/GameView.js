import React from 'react'
import './GameView.scss'
import _ from 'lodash'
import { connect } from 'react-redux'


export class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "3dhubs",
      attempt: 0,
    }
  }

  renderWord(word) {
    return (
      <div>
        { _.map(word, (l, i) => { return <span key={i} className="letter">{l}</span> }) }
      </div>
    )
  }

  render() {
    return (
      <div>
        <h4>Try to guess the word!</h4>
        <div>Attempts: {this.state.attempt}</div> 
        { this.renderWord(this.state.word) }
        <input className='input' maxLength="1"></input>
      </div>
    )
  }
}

const mapDispatchToProps = {
  //increment : () => increment(1),
  //doubleAsync
}

const mapStateToProps = (state) => ({
  word : state.word,
  attempt: state.attempt
})

export default connect({}, null)(GameView)
