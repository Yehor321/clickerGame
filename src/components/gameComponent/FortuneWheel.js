import React, { Component } from 'react';
import { bafs } from '../../utils/constants';
import {
  faSkiing, faMeteor, faRadiation, faHeart, faDna, faHeartbeat, faSnowplow, faShippingFast
} from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBafToPlayer } from '../../redux/actions/playersActions';

class FortuneWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: null,
      style: 0,
      bafs: [],
      rolled: false,
      rolledBaf: null
    }
  }

  componentDidMount() {
    this.pickBafs(2, false)
  }

  role = async () => {
    let side = Math.round(Math.random() * (6 - 1) + 1);

    await this.rotateFunc(side);
    this.setState({
      side: side,
      rolled: true
    }, async () => {
      await this.pickBafs(side, true);
    })

  }

  pickBafs = async (side, active) => {
    let bafsArr = []

    for (let i = 0; i < 6; i++) {
      let randomNumber = Math.round(Math.random() * (8 - 1) + 1);
      bafsArr.push(bafs[randomNumber])
    }
    await bafsArr.forEach(baf => {
      let type = Math.round(Math.random() * (2 - 1) + 1);
      baf.type = type
    })

    this.setState({
      ...this.state,
      bafs: bafsArr,
      rolledBaf: bafsArr[side - 1]
    }, () => {
      !isEmpty(this.props.players.gameSchema) && active && this.props.setBafToPlayer(this.props.players.gameSchema.lastPlayer, this.state.rolledBaf)
    })
  }

  rotateFunc = async (side) => {
    let cube = document.getElementsByClassName('cube')[0];
    let style = null;
    cube.style.transform = ""
    switch (side) {
      case 1: style = `rotate3d(250,79,1,180deg)`
        break;
      case 2: style = `rotateX(${-90 * 5}deg)`
        break;
      case 3: style = `rotate3d(60,179,1,90deg)`
        break;
      case 4: style = `rotateY(${-90 * 5}deg)`
        break;
      case 5: style = `rotate3d(200,30,1,90deg)`
        break;
      case 6: style = `rotateX(${360 * 5}deg)`
        break;
      default:
        break;
    }
    this.setState({
      ...this.state,
      style: style
    }, () => {
      cube.style.transform = this.state.style
    });
  }

  render() {
    const { bafs, side, rolledBaf } = this.state;

    return (
      <div className="fortune-wheel">
        {this.state.rolled ?
          <Link to={'/game'}>
            <button
              className="btn _custom-width"
            >
              <label className="btn-bg"></label>
              <span>GO back</span>
            </button>
          </Link> :
          <button
            className="btn _custom-width"
            onClick={() => this.role()}
          >
            <label className="btn-bg"></label>
            <span>roll</span>
          </button>
        }
        <p className="description">
          {bafs.length && side && rolledBaf.name}
        </p>
        <div className="cube">
          {bafs.map((baf, index) => {
            return <div key={index} className="cube-side">
              <FontAwesomeIcon icon={baf.icon} size={'3x'} color={baf.type == 1 ? "pink" : "orange"} />
            </div>
          })}
        </div>
      </div>

    )
  }
}


const mapStateToProps = state => ({
  players: state.players
});


export default connect(mapStateToProps, { setBafToPlayer })(FortuneWheel);