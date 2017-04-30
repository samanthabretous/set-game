import _ from 'lodash';
import { socket } from './connections';

/** ===========================
  TYPES
==============================*/
export const CLICKED_CARDS = 'clicked_cards';
export const INVITE_PLAYERS = 'invite_players';
export const UPDATE_CARDS = 'update_cards';
export const ADD_MEMBER = 'update_cards';
export const CONNECTION_STATUS = 'update_cards';
export const SET_ROOM_NAME = 'set_room_name';
export const SET_PLAYER_INFO = 'set_player_info';
export const ADD_PLAYER = 'players';
export const RELOAD_GAME = 'reload_game';
export const UPDATE_GAME = 'update_game';
export const GAME_STARTED = 'game_started';
export const LEFT_PLAYER = 'left_player';
export const GO_TO_GAME = 'go_to_game';


/** ===========================
  ACTIONS
==============================*/
export const goToGame = gameInfo => ({
  type: GO_TO_GAME,
  gameInfo,
});

export const addClickedCard = payload => ({
  type: CLICKED_CARDS,
  payload,
});

export const updateCards = cards => ({
  type: UPDATE_CARDS,
  cards,
});

export const addPlayer = player => ({
  type: ADD_PLAYER,
  player,
});

export const leftPlayer = playerHasLeft => ({
  type: LEFT_PLAYER,
  playerHasLeft,
});

export const gameStarted = (deck, board) => ({
  type: GAME_STARTED,
  deck,
  board,
});

export default (store) => {
  socket.on('updateCards', (cards) => {
    updateCards(cards)
  });

  socket.on('addPlayer', (player) => {
    addPlayer(player)
  });

  socket.on('leftPlayer', (playerHasLeft) => {
    leftPlayer(playerHasLeft)
  });

  socket.on('reloadGame', (payload) => {
    const { cards, started, players, game } = payload;
    const deck = sortCards(cards);
    store.dispatch({
      type: RELOAD_GAME,
      deck,
      started,
      players,
      game,
      board: deck.splice(0, 12),
    });
  });

  socket.on('updateGame', (payload) => {
    const { cards, playerSet } = payload;
    const deck = sortCards(cards);
    store.dispatch({
      type: UPDATE_GAME,
      deck,
      board: deck.splice(0, 12),
      playerSet,
    });
  });
};