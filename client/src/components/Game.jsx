import React from 'react'
import store from '../store'

//components
import Board from './Board';
import ChatBar from './chatBar';

import isSetOnBoard from './isSetOnBoard'

const Game = React.createClass({
  componentDidMount(){
    setTimeout(() => {
      //props.inviteModalAction(false)
    }, 5000)
  },
  render(){
    return (
      <div className="gameView">
        {this.props.board.length > 0 && <Board {...this.props}/>}
      </div>
    )
  }
})

export default Game;