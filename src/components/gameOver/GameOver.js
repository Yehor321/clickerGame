import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { Redirect } from 'react-router-dom';
import {
  faCrown
} from '@fortawesome/free-solid-svg-icons';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayToSort: []
    }
  }

  componentDidMount() {
    let array = this.props.players.gameSchema.resultTable
    console.log(array)
    array.sort(function (a, b) {
      return b.gs - a.gs;
    })

    this.setState({
      arrayToSort: array
    })

  }
  render() {
    const renderTable = () => {
      return <tbody>
        {this.state.arrayToSort.map((player, index) => {
          return <tr key={player.playerId} className="result-item">
            <td>{player.playerId}</td>
            <td>
              {index === 0 && <FontAwesomeIcon className="crown" color={'orange'} icon={faCrown} />}

              <FontAwesomeIcon icon={player.icon} />

            </td>
            <td>{player.name}</td>
            <td>{player.gs}</td>
          </tr>
        })}
      </tbody>

    }

    return (
      <div className="game-over-page">
        {isEmpty(this.props.players.gameSchema.resultTable) && < Redirect to="/" />}
        <div className="glitch-wrapper">
          <h1 className="glitch" data-text="GAME-">GAME-</h1>
          <h1 className="glitch" data-text=" OVER"> OVER</h1>
        </div>

        <table className="results-table">
          <thead>
            <tr>
              <th>
                id
          </th>
              <th>
                icon
          </th>
              <th>
                name
          </th>
              <th>
                Gear Score
          </th>
            </tr>
          </thead>
          {

            !isEmpty(this.props.players.gameSchema) && renderTable()}


        </table>
      </div>


    )
  }
}


const mapStateToProps = state => ({
  players: state.players
});


export default connect(mapStateToProps)(GameOver);