import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';

const PlayerItemInMenu = lazy(() => import('./PlayerItemInMenu'))

class PlayersInMenu extends Component {
  render() {
    const { players } = this.props;
    const { gameSchema } = players;
    return (
      <div className="players-in-menu">
        {
          gameSchema.players.map(player => {
            return <PlayerItemInMenu key={player.playerId} player={player} />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps)(PlayersInMenu);
