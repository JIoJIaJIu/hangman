import React from 'react'
import QuizzImage from '../assets/quizz.jpg'
import './HomeView.scss'
import { connect } from 'react-redux'

import { requestStartGame, startGame } from '../../Game/redux/actions'
import REST from '../../../rest'

export class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false
    }
  }
  startGame = (e) => {
    e.preventDefault();
    this.setState({loading: true})
    this.props.requestStartGame()

    REST.createGame().then((response) => {
      if (response.code !== 202) {
        return this.printError();
      }
      this.setState({loading: false})
      this.props.startGame(response.id);
    }, () => {
      this.printError()
    })
  }

  printError() {
    this.setState({
      error: "The game cannot be created",
      loading: false
    })
  }

  render () {
    return (
      <div>
        <h4>Welcome!</h4>
        <img alt='This is a quizz!' className='quizz' src={QuizzImage} />
        { this.state.error && <div className="error">{this.state.error}</div> }
        { this.state.loading ?
          <span>Loading..</span>
          :
          <a href='/game' className='btn btn-primary btn-lg' onClick={this.startGame} >Start the Game</a>
        }
      </div>
    );
  }
}

export default connect(null, {
  requestStartGame,
  startGame
})(HomeView)
  /*
  dispatch => ({
    requestStartGame: () => dispatch(requestStartGame())
  })
  */
