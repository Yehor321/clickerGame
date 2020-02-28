import React, { Component, lazy } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { setUsers, startPlayersEditing, setGameSchema } from '../../redux/actions/playersActions';
import { Link } from 'react-router-dom';
import { genereateRandomNumber } from '../../utils/constants';

const PickHeroItem = lazy(() => import('./PickHeroItem'));


class PickHeroPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersCount: [],
      players: [],
      hardLvl: 1,
      hpSystem: 0,
      startHpCount: 3,
      circle: 1,
      validForm: false,
      currentPlayer: null,
      activeGame: false,
      playedPlayers: [],
      diedPlayers: [],
      sortedTable: [],
      gameOver: false
    }
  }


  checkValidForm = () => {
    const { players } = this.state;

    let val = true
    if (players.length) {
      players.map(player => {
        if (
          isEmpty(player.icon) ||
          isEmpty(player.name)
        ) { val = false }
      })
    } else val = false
    this.setState({
      ...this.state,
      validForm: val
    })
  };

  componentDidMount() {
    let players = [...Array(parseInt(this.props.playersCount)).keys()];

    players = players.map((player) => {
      return {
        playerId: player,
        icon: null,
        name: null,
        health: null
      }
    })

    this.setState({
      playersCount: [...Array(parseInt(this.props.playersCount)).keys()],
      players: players
    })
  };

  setPlayerField = (playerId, methodName, methodValue) => {
    let updatedPlayers = [];
    let fieldAllPlayers = [];
    const checkValid = (player) => {
      if (
        player.icon == null ||
        player.name == null ||
        isEmpty(player.name)) {
        return false
      } else return true
    };

    updatedPlayers = this.state.players.map((player) => {
      if (player.playerId == playerId) {
        player[methodName] = methodValue
        return player
      } else { return player }
    });

    updatedPlayers.map((player) => {
      fieldAllPlayers = checkValid(player)
    });

    // this.props.setValidForm(fieldAllPlayers);

    this.setState({
      ...this.state,
      players: updatedPlayers
    })
  };

  startGame = () => {
    const {
      hardLvl,
      hpSystem,
      startHpCount,
      players,
      circle,
      currentPlayer,
      activeGame,
      playedPlayers,
      diedPlayers,
      sortedTable,
      gameOver
    } = this.state;
    let gameSchema = {};
    let generetedPlayers = players.map(player => {
      player.health = startHpCount
      player.bafs = []
      player.bafsObj = {
        extraAtack: 0,
        extraSpeed: 0,
        extraPercent: 0,
      }
      player.atack = 5
      player.gameHistory = []
      return player;
    })

    gameSchema = {
      players: generetedPlayers,
      hardLvl: hardLvl,
      hpSystem,
      circle,
      currentPlayer,
      activeGame,
      playedPlayers,
      diedPlayers,
      sortedTable,
      gameOver
    }

    this.props.startPlayersEditing(false);
    this.props.setGameSchema(gameSchema);
  }

  render() {
    const { playersCount, players, validForm } = this.state;

    return (
      <div className="pick-hero-page">
        <h3>pick your hero <sup>{'[ ' + playersCount.length} ~ Players {' ]'}</sup></h3>
        <h5 className="russian-text text-pulsing">Заполните пустые поля, и выберите иконки для каждого игрока!</h5>
        <br />
        {playersCount.map((player, index) => {
          return <PickHeroItem checkValidForm={this.checkValidForm} players={players} setPlayerField={this.setPlayerField} key={index} index={index} />
        })}

        {validForm &&
          <Link to={'/game'}>
            <button
              className="btn _custom-width"
              onClick={() => this.startGame()}
            >
              <label className="btn-bg"></label>
              <span>Start</span>
            </button>
          </Link>
        }
      </div>
    )
  }
}

export default connect(null, { startPlayersEditing, setGameSchema })(PickHeroPage);
