import React, { Component, lazy } from 'react';
import logo from './angryFace.jpg';
import { connect } from 'react-redux';
import {
  setUsers,
  startPlayersEditing
} from '../../redux/actions/playersActions';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const PlayersInMenu = lazy(() => import('./PlayersInMenu'))

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersCount: 0,
    }
  }

  toggleState = (stateName, value) => this.setState({
    ...this.state,
    [stateName]: value ? value : !this.state[stateName]
  })


  render() {
    const { players } = this.props;

    return (
      <>
        {players.gameSchema.activeGame ? "" :
          <div className="menu">
            <Link to={'/'}>
              <div className="logo">
                <p> <span>C</span>lick-<span>P</span>uncher</p>
                <img src={logo} alt={'logo'} />
              </div>
            </Link>
            {!players.gameSchema.activeGame &&
              !players.gameSchema.gameOver &&
              <div className="players-panel">
                {isEmpty(this.props.players.gameSchema) &&
                  window.location.pathname == "/" &&
                  <button className="btn _common mr-4" onClick={
                    () => this.props.startPlayersEditing()
                  }>
                    <span>new Game</span>
                  </button>
                }

                {!isEmpty(this.props.players.gameSchema) &&
                  <PlayersInMenu />
                }
              </div>
            }
          </div>
        }
      </>

    )
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps, { startPlayersEditing })(Menu);