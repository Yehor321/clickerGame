import React from 'react';
import store from '../store/store';
import {
  SET_USERS_COUNT,
  TOGGLE_PLAYERS_FORM_EDITING,
  SET_GAME_CHEMA,
  SET_CURRENT_PLAYER,
  SET_ACTIVE_GAME,
  WRITE_ROUND_SCTATISTIC,
  PLAYER_PLAYED,
  RESET_CIRCLE,
  MINUS_HEALTH,
  ADD_BAF,
  PLAYER_DIED,
  SET_RESULT_TABLE
} from './actionTypes';
import { toast } from 'react-toastify';
import uuidv4 from 'uuid/v4';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { gameOver } from '../../utils/constants';

export const setUsers = (count) => dispatch => {
  dispatch({
    type: SET_USERS_COUNT,
    payload: count
  });
};


export const startPlayersEditing = (value) => dispatch => {
  dispatch({
    type: TOGGLE_PLAYERS_FORM_EDITING,
    payload: value ? value : !store.getState().players.formPlayersEditing
  });
};

export const resetCircle = () => dispatch => {
  dispatch({
    type: RESET_CIRCLE,
    payload: {
      circle: ++store.getState().players.gameSchema.circle
    }
  });

  checkPlayers();
};

export const setGameSchema = (schema) => dispatch => {
  dispatch({
    type: SET_GAME_CHEMA,
    payload: schema
  });
};

export const selectCurrentPlayer = (playerId) => dispatch => {
  let newPlayersArr = store.getState().players.gameSchema.players;

  newPlayersArr = newPlayersArr.map(player => {
    if (player.playerId === playerId) {
      player.bafs.forEach((baf) => {
        switch (baf.id) {
          case 2:
            player.bafsObj.extraAtack += 2
            break;
          case 3:
            player.bafsObj.extraPercent -= 7;
            break;
          case 4:
            player.bafsObj.extraPercent += 5;
            break;
          case 6:
            player.bafsObj.extraAtack -= 3;
            break;
          case 7:
            player.bafsObj.extraSpeed += 9;
            break;
          case 8:
            player.bafsObj.extraAtack -= 3.5;
            break;
          case 9:
            player.bafsObj.extraPercent -= 6;
            break;
          case 10:
            player.bafsObj.extraAtack += 2;
            break;
          case 11:
            player.bafsObj.extraPercent += 5;
            break;
          case 13:
            player.bafsObj.extraPercent -= 13;
            break;
          case 14:
            player.bafsObj.extraAtack += 4;
            break;
          case 16:
            player.bafsObj.extraPercent += 10;
            break;
          case 18:
            player.bafsObj.extraAtack += 2.7
            break;
          case 19:
            player.bafsObj.extraAtack += 3.2
            break;
          default:
            break;
        }
      })
      player.bafs = [];
      return player;
    } else {
      return player;
    }
  })

  dispatch({
    type: SET_CURRENT_PLAYER,
    payload: playerId
  });
};

export const minusHealth = (playerId, number) => dispatch => {
  let newPlayersArr = store.getState().players.gameSchema.players;
  newPlayersArr = newPlayersArr.map(player => {
    if (player.playerId === playerId) {
      player.health -= number
      return player
    } else return player
  })
  dispatch({
    type: MINUS_HEALTH,
    payload: newPlayersArr
  });
};

export const startRound = (bool) => dispatch => {
  dispatch({
    type: SET_ACTIVE_GAME,
    payload: bool
  });
};

export const writeRoundStatistic = (id, obj, circle) => dispatch => {
  let newPlayersArr = store.getState().players.gameSchema.players;

  obj.circle = circle;
  newPlayersArr.map((player) => {
    if (player.playerId === id) {
      player.gameHistory.unshift(obj)
      player.bafsObj.extraAtack = 0;
      player.bafsObj.extraPercent = 0;
      player.bafsObj.extraSpeed = 0;
      return player;
    } else return player;
  })

  dispatch({
    type: WRITE_ROUND_SCTATISTIC,
    payload: newPlayersArr
  });

  dispatch({
    type: PLAYER_PLAYED,
    payload: id
  });
};

export const setBafToPlayer = (plyerId, baf) => dispatch => {
  let newPlayersArr = store.getState().players.gameSchema.players;

  newPlayersArr = newPlayersArr.map(player => {
    if (player.playerId === plyerId) {
      player.bafs.unshift(baf);
      player.bafs.forEach((baf, index) => {
        switch (baf.id) {
          case 0:
          case 5:
            player.health += 1
            break;
          case 12:
            player.health += 2
            break;
          case 1:
          case 15:
          case 17:
            player.health -= 1
            break;
          default:
            break;
        }
      })

      return player;
    } else return player;
  })

  dispatch({
    type: ADD_BAF,
    payload: newPlayersArr
  });
}

export const checkPlayers = () => async dispatch => {
  let newPlayersArr = await store.getState().players.gameSchema.players;
  let diedPlayersArr = await store.getState().players.gameSchema.diedPlayers;

  await newPlayersArr.map(player => {
    if (player.health <= 0 && !diedPlayersArr.includes(player.playerId)) {
      dispatch({
        type: PLAYER_DIED,
        payload: player.playerId
      });
    }
  })

  let livePlayersNumber = await newPlayersArr.length - store.getState().players.gameSchema.diedPlayers.length
  // console.log(livePlayersNumber)
  if (livePlayersNumber <= 1) {
    gameOver(livePlayersNumber)
  }


}

export const setResultTable = (sortedTable) => dispatch => {
  dispatch({
    type: SET_RESULT_TABLE,
    payload: sortedTable
  });
}