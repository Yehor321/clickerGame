import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { startRound, writeRoundStatistic, resetCircle, checkPlayers, minusHealth } from './../../redux/actions/playersActions';
import { Redirect } from 'react-router-dom';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { genereateRandomNumber } from '../../utils/constants';

const GameOver = lazy(() => import('../gameOver/GameOver'));
const ClickBar = lazy(() => import('./ClickBar'));

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseHeroModal: false,
      road: null,
      bonus: {
        atack: 0,
        speed: 0,
        percent: 0
      },
      currentPlayer: null,
      percentage: 50,
      activeClickPlace: false,
      FortuneModal: false,
      gameResult: {
        status: null,
        clicks: 0,
        time: null
      },
      timer: {
        on: false,
        mills: 0,
        secs: 0,
        mins: 0
      },
      colors: {
        1: "bg-success",
        2: "bg-warning",
        3: "bg-primary"
      },
      gameStartCounter: 3,
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      percentage: 50,
      gameStartCounter: 3,
      road: genereateRandomNumber(1, 13)
    })
  };

  setBonuses = async () => {
    const { players } = this.props;
    let hh = await players.gameSchema.players[this.state.currentPlayer].bafsObj.extraAtack
    let ff = await players.gameSchema.players[this.state.currentPlayer].bafsObj.extraSpeed


    this.setState({
      ...this.state,
      bonus: {
        ...this.state.bonus,
        atack: hh,
        speed: ff,
      }
    })
  };

  startRound = async () => {
    const { players, startRound } = this.props;

    if (isEmpty(players.gameSchema) ||
      players.gameSchema.currentPlayer == null) {
      console.log("ERROR")
      this.toggleState('chooseHeroModal');
    } else {
      startRound(true);
      const { players } = this.props;
      let bb = await players.gameSchema.players[players.gameSchema.currentPlayer].bafsObj.extraPercent
      this.setState({
        ...this.state,
        percentage: this.state.percentage + bb,
      })
      this.startCounter();
    }
  };

  startCounter = () => {
    let counter = 3;
    setInterval(() => {
      if (counter > 0) {
        counter -= 1
        this.setState({
          ...this.state,
          currentPlayer: this.props.players.gameSchema.currentPlayer,
          gameStartCounter: counter
        })
      }
    }, 900)
  };

  plusPercent = async () => {
    const { percentage, activeClickPlace, bonus } = this.state;
    const { players } = this.props;
    let atack = players.gameSchema.players[players.gameSchema.currentPlayer].atack;
    let plus = percentage + parseInt(atack) + this.state.bonus.atack;

    activeClickPlace && this.setState({
      ...this.state,
      gameResult: {
        ...this.state.gameResult,
        clicks: this.state.gameResult.clicks + 1
      },
      percentage: plus
    }, () => {
      this.state.percentage >= 100 && this.endRound(true);
    })
  };

  resetIntervalFunc = (item) => {
    clearInterval(item);
  };

  minusPercent = async (number, interval) => {
    const { percentage, bonus } = this.state;
    percentage <= 0 && this.endRound(false);

    let tempVariable = await setInterval(() => {

      if ((percentage > 0 && percentage < 100)) {
        this.setState({
          ...this.state,
          minusPercentintervalResetFunc: tempVariable,
          percentage: this.state.percentage - (this.state.activeClickPlace ? number.toFixed(2) : 0)
        }, () => {
          this.state.percentage <= 0 && this.endRound(false);
        })
      }

    }, (interval * 1000 + parseInt(bonus.speed) * 100));
  };

  endRound = (status) => {
    const { mills, secs, mins } = this.state.timer;
    const { players, writeRoundStatistic, startRound } = this.props;
    let finalRoundObj = this.state.gameResult;
    this.resetIntervalFunc(this.state.minusPercentintervalResetFunc);
    this.resetIntervalFunc(this.state.startIntervalResetFunc);

    finalRoundObj.status = status;
    finalRoundObj.time = mins + ':' + secs + ":" + mills,
      this.setState({
        gameStartCounter: 3,
        activeClickPlace: false,
        timer: {
          on: false,
          mills: 0,
          mins: 0,
          secs: 0
        },
        percentage: 50,
        gameResult: {
          status: null,
          clicks: 0,
          time: null
        },
        FortuneModal: true
      }, async () => {
        startRound(false);
        await writeRoundStatistic(
          players.gameSchema.currentPlayer,
          finalRoundObj,
          players.gameSchema.circle
        );
        this.checkCircle(finalRoundObj.status);
      })
  };

  checkCircle = async (status) => {
    const { players, resetCircle, minusHealth, checkPlayers } = this.props;
    if (players.gameSchema.players.length ===
      players.gameSchema.playedPlayers.length +
      players.gameSchema.diedPlayers.length) {
      await resetCircle();
      checkPlayers();
    }

    !status && await minusHealth(this.state.currentPlayer, 1);
  };

  activateZone = async () => this.setState({
    ...this.state,

    activeClickPlace: true
  }, () => {
    let timeInterval = this.props.players.gameSchema.circle / 10 + 0.15
    this.minusPercent(
      5 + (this.props.players.gameSchema.circle + 1 / 10 + 0.3),
      1 - (timeInterval > -0.1 ? timeInterval : 0.1)
    );
    this.setBonuses();
    this.toggleTimer(true);
  });


  toggleTimer = (bool) => {
    this.setState({
      ...this.state,
      timer: {
        ...this.state.timer,
        on: bool ? bool : !this.state.timer.on
      }
    }, () => {
      this.state.timer.on && this.startTimer();
    })
  };

  startTimer = () => {
    let seconds = 0;
    let milliseconds = 0;
    let minutes = 0;

    let ll = setInterval(() => {
      if (milliseconds === 100) {
        seconds += 1;
        milliseconds = 0;
        milliseconds += 10;
      } else milliseconds += 10;
      if (seconds === 60) { minutes += 1; seconds = 0; }
      this.state.timer.on && this.setState({
        ...this.state,
        startIntervalResetFunc: ll,
        timer: {
          ...this.state.timer,
          secs: seconds,
          mills: milliseconds,
          mins: minutes
        }
      })
    }, 100);
  };

  toggleState = (stateName) => {
    this.setState({
      ...this.state,
      [stateName]: !this.state[stateName]
    })
  }

  render() {
    const {
      gameStartCounter,
      colors,
      percentage,
      bonus,
      activateZone,
      activeClickPlace,
      FortuneModal,
      timer,
      chooseHeroModal,
      road
    } = this.state;
    const { players } = this.props;

    return (
      <div className={`game ${players.gameSchema.activeGame && 'full-window'}`} >
        {players.gameSchema.gameOver && <GameOver />}
        {
          players.gameSchema.activeGame && gameStartCounter >= 1 &&
          <div className={`game-bg ${colors[gameStartCounter]}`}>
            <div className="game-start-counter">{gameStartCounter > 0 ? gameStartCounter : "GO!"}</div>
          </div>
        }
        {
          players.gameSchema.activeGame && gameStartCounter < 1 &&
          !players.gameSchema.gameOver &&
          <div
            className={`click-place road-bg _${road + 1}`}
            onClick={() =>
              activeClickPlace ?
                this.plusPercent()
                : this.activateZone()
            }
          >
            <p>{percentage} ===={bonus.percent}</p>
            <p>{percentage}</p>
            <ClickBar percentage={percentage + bonus.percent} activateZone={activateZone} />
            <p className="game-time">{timer.mins + " - " + timer.secs + ' - ' + timer.mills}</p>
          </div>
        }
        {isEmpty(players.gameSchema.players) && <Redirect to="/" />}
        {
          !players.gameSchema.activeGame &&
          !players.gameSchema.gameOver &&
          !isEmpty(players.gameSchema) &&
          <button className="btn _custom-width" onClick={() => this.startRound()}>
            <label className="btn-bg"></label>
            <span>
              GO!!
            </span>
          </button>
        }
        <Modal isOpen={FortuneModal}  >
          <ModalHeader>Do you want to spin a cube for some bonus?</ModalHeader>
          <ModalBody>
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
          </ModalBody>
          <ModalFooter>
            <Link to="/ff">SPIN</Link>
            <button color="secondary" onClick={() => this.toggleState("FortuneModal")}>NO !</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={chooseHeroModal}  >
          <ModalHeader>Please!!!!</ModalHeader>
          <ModalBody>
            <p className="russian-text">
              Выбери своего персонажа.
            </p>
            <p className="russian-text">
              Просто жмакни на свою иконку сверху в меню. ОК?
            </p>
          </ModalBody>
          <ModalFooter>
            <button onClick={() => this.toggleState("chooseHeroModal")} >OK</button>
            {/* <Link to="/gg">SPIN</Link>
            <button color="secondary" onClick={() => this.toggleState("FortuneModal")}>NO !</button> */}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: state.players
});


export default connect(mapStateToProps, { startRound, writeRoundStatistic, resetCircle, checkPlayers, minusHealth })(GameComponent);