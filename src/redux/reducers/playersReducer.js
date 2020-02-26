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
} from '../actions/actionTypes';

const initialState = {
  formPlayersEditing: false,
  gameSchema: {}
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_COUNT:
      return {
        ...state,
        players: action.payload
      };
    case TOGGLE_PLAYERS_FORM_EDITING: return {
      ...state,
      formPlayersEditing: action.payload
    };
    case SET_GAME_CHEMA:
      return {
        ...state,
        gameSchema: action.payload
      }
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          currentPlayer: action.payload
        }
      }
    case SET_ACTIVE_GAME:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          activeGame: action.payload
        }
      }
    case WRITE_ROUND_SCTATISTIC:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          players: action.payload
        }
      }
    case RESET_CIRCLE:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          circle: action.payload.circle,
          playedPlayers: []
        }
      }
    case PLAYER_PLAYED:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          currentPlayer: null,
          lastPlayer: action.payload,
          playedPlayers: [...state.gameSchema.playedPlayers, action.payload]
        }
      }
    case MINUS_HEALTH:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          players: action.payload
        }
      }
    case SET_RESULT_TABLE:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          gameOver: true,
          resultTable: action.payload
        }
      }
    case ADD_BAF:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          players: action.payload
        }
      }
    case PLAYER_DIED:
      return {
        ...state,
        gameSchema: {
          ...state.gameSchema,
          diedPlayers: [...state.gameSchema.diedPlayers, action.payload]
        }
      }
    default:
      return state;
  }
};

export default playersReducer;