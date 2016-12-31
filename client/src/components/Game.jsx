import React from 'react'
import store from '../store'

//components
import Board from './Board';
import ChatBar from './chatBar';

import isSetOnBoard from '../utils/isSetOnBoard'

const Game = React.createClass({
  componentDidMount(){
    setTimeout(() => {
      //props.inviteModalAction(false)
    }, 5000)
  },
  render(){
    console.log(this.props.deck)
    return (
      <div className="gameView">
        {this.props.deck && <Board {...this.props}/>}
      </div>
    )
  }
})

export default Game;
