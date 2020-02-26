import React, { Component } from 'react';
import {
  faCat,
  faCrow,
  faGhost,
  faSkullCrossbones,
  faSpider,
  faDog,
  faDove,
  faDragon,
  faFish,
  faFrog,
  faHorse,
  faOtter,
  faAngry,
  faBaby,
  faBlind,
  faBug,
  faDizzy,
  faFemale,
  faFlushed,
  faFrown,
  faGrimace,
  faGrin,
  faGrinBeam,
  faGrinHearts,
  faGrinTongueSquint,
  faGrinTongueWink,

  //====>
  faHeart,
  faTachometerAlt,
  faFistRaised,
  faRoad
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { selectCurrentPlayer } from './../../redux/actions/playersActions';

class PlayerItemInMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hpModal: false,
      bfModal: false
    }
  }

  changeState = (stateName, value) => {
    switch (stateName) {
      case "hpModal":
        this.setState({
          bfModal: false,
          hpModal: !this.state.hpModal
        })
        break;
      case "bfModal":
        this.setState({
          hpModal: false,
          bfModal: !this.state.bfModal
        })
      default:
        break;
    }
  }

  closeModals = () => this.setState({
    ...this.state,
    hpModal: false,
    bfModal: false
  })

  selectHero = (id) => {
    this.props.selectCurrentPlayer(id);
  }

  renderBafs = () => {
    const { players } = this.props;
    let playerBafs = players.gameSchema.players[players.gameSchema.currentPlayer].bafsObj
    let atack = playerBafs.extraAtack
    let speed = playerBafs.extraSpeed
    let percent = playerBafs.extraPercent

    return <>
      <div className="baf-drop">
        <FontAwesomeIcon icon={faFistRaised} />
        <span>
          {atack}
        </span>
      </div>
      <div className="baf-drop">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>
          {speed}%
        </span>
      </div>
      <div className="baf-drop">
        <FontAwesomeIcon icon={faRoad} />
        <span>
          {percent}%
        </span>
      </div>
    </>
  }

  render() {
    const { player, players } = this.props;
    const { hpModal, bfModal } = this.state;

    return (
      <div className={
        `players-in-menu__item 
        ${
        players.gameSchema.currentPlayer === player.playerId && "current-player"
        }
        ${
        players.gameSchema.playedPlayers.includes(player.playerId) && "played-player"}
        ${players.gameSchema.diedPlayers.includes(player.playerId) && "died-player"}`

      } title={player.name} onClick={() => this.selectHero(player.playerId)}>

        <div className="player-icon">
          <FontAwesomeIcon size={'2x'} icon={player.icon} />
        </div>
        <p className="player-name">
          {player.name}
        </p>
        <div className="health-number">
          <span>
            {player.health}
            <sup>
              <FontAwesomeIcon icon={faHeart} />
            </sup>
          </span>
        </div>
        <div className="atack-number">
          <span>
            {player.atack}
            <sup>
              <FontAwesomeIcon icon={faFistRaised} />
            </sup>
          </span>
        </div>
        <div className="extra-info">
          <span
            onClick={players.gameSchema.currentPlayer === player.playerId ?
              () => this.changeState("hpModal") : () => { }
            }
            onMouseLeave={() => this.setState({
              ...this.state,
              bfModal: false,
              hpModal: false
            })}
          >
            HP
          </span>
          {
            hpModal &&
            <div className="hearts">
              {[...Array(parseInt(player.health)).keys()].map((heart, id) => {
                return <FontAwesomeIcon key={id} icon={faHeart} color="red" />
              })}
            </div>
          }
          <span
            onClick={players.gameSchema.currentPlayer === player.playerId ?
              () => this.changeState("bfModal") : () => { }
            }
            onMouseLeave={() => this.setState({
              ...this.state,
              bfModal: false,
              hpModal: false
            })}
          >
            BFS
          </span>
          {
            bfModal &&
            <div className="bafs">
              <>
                {this.renderBafs()}
              </>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps, { selectCurrentPlayer })(PlayerItemInMenu);
