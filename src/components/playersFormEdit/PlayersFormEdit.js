import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';

const PickHeroPage = lazy(() => import('./PickHeroPage'))

class PlayersFormEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersCount: 2,
      currentStep: 1,
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      currentStep: 1
    })
  };



  onChange = (e) => {
    switch (e.target.name) {
      case "playersCount":
        e.target.value < 2 ||
          e.target.value > 6 &&
          (e.target.value = 6)
        break;

      default:
        break;
    }

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  switchStep = (sign) => {
    const { currentStep } = this.state;
    switch (sign) {
      case '-':
        this.setState({
          ...this.state,
          currentStep: --this.state.currentStep,
        })
        break;
      case '+':

        this.setState({ ...this.state, currentStep: ++this.state.currentStep })
        break;
      default:
        break;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  }




  render() {
    const { players } = this.props;
    const {
      playersCount,
      currentStep
    } = this.state;



    return (
      <div className="edit-players-form">
        {players.formPlayersEditing ?
          <form onSubmit={this.onSubmit}>

            {
              currentStep == 1 &&
              <div className="d-flex flex-row align-center">

                <p className="mr-4">Players number:</p>
                <fieldset>

                  <div className="input-group">

                    <label className="label-border">

                      <span className="border"></span>
                      <label className="label-bg">

                        <input
                          className="input-common"
                          min={2}
                          max={6}
                          type="number"
                          name="playersCount"
                          value={playersCount}
                          onChange={this.onChange}
                        />
                      </label>
                    </label>

                  </div>
                </fieldset>
              </div>
            }
            {
              currentStep == 2 &&
              <PickHeroPage
                playersCount={playersCount}
              />
            }

            <div className="steps">
              <button
                className={`${currentStep <= 1 && 'text-secondary'}`}
                disabled={currentStep <= 1 ? true : false}
                onClick={() => this.switchStep('-')}
              >
                &#x3c;
              </button>
              <div className="current-step">
                {currentStep + '/2'}
              </div>
              <button
                className={`${currentStep >= 2 && 'text-secondary'}`}
                disabled={currentStep >= 2 ? true : false}
                onClick={() => this.switchStep('+')}
              >
                &#x3e;
              </button>
            </div>
          </form> :
          ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: state.players
});


export default connect(mapStateToProps)(PlayersFormEdit);