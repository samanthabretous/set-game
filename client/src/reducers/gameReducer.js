import { PLAYERS, UPDATE_CARDS, BOARD, INVITE_PLAYERS, MODAL_STATUS, CLICKED_CARDS, LEFT_PLAYERS, ADD_MEMBER, CONNECTION_STATUS,CONNECTIONS, ROOM_STATUS, SET_ROOM_NAME, GO_TO_GAME } from '../actions/types';

const INTIAL_STATE = {
  players: [],
  playerHasLeft: null,
  cards: null, 
  board: [], 
  roomName: "",
  gameRoom: false,
  modalStatus: true,
  clickedCards: [],
  member: {},
  status: 'disconnected',
}

export default function(state = INTIAL_STATE, action) {
  console.log("action",action)
  switch(action.type){
    case PLAYERS: 
    case INVITE_PLAYERS: 
    case UPDATE_CARDS: 
    case BOARD: 
    case MODAL_STATUS: 
    case ADD_MEMBER: 
    case CONNECTION_STATUS: 
    case SET_ROOM_NAME: 
      let key = Object.keys(action)[1]
      return Object.assign({}, state, {[key]: action[key]});
    case CLICKED_CARDS: 
      return Object.assign({}, state, {clickedCards: action.payload})
    case GO_TO_GAME: 
      console.log(action.gameInfo)
      return Object.assign({}, state, {gameRoom: true, room: action.gameInfo.roomName, players: action.gameInfo.players})
    default: 
      return state
  }
}