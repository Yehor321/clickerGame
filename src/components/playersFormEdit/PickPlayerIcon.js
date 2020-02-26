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
  //======>
  faRandom
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isEmpty } from 'lodash';
import { iconsArr, genereateRandomNumber } from '../../utils/constants';

class PickPlayerIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: iconsArr,
      iconsModal: false,
      pickedIcon: null,
      sellectedIcons: []
    }
  }



  toggleState = (stateName, value) => {
    let sellectedIcons = [];
    switch (stateName) {
      case 'iconsModal':
        sellectedIcons = this.props.players.map(player => {
          if (player.icon) return player.icon.iconName
        })
        break;
      default:
        break;
    }

    this.setState({
      ...this.state,
      [stateName]: value ? value : !this.state[stateName],
      sellectedIcons
    })
  }

  selectIcon = (icon) => {
    this.props.setPlayerField(this.props.index, 'icon', icon)
    this.setState({
      ...this.state,
      pickedIcon: icon,
      iconsModal: false
    }, () => this.props.checkValidForm())
  }

  pickRandomIcon = async () => {
    const { setIconToUsedFunc } = this.props;
    await setIconToUsedFunc(this.props.index)
    this.setState({
      ...this.state,
      pickedIcon: setIconToUsedFunc(this.props.index),
    }, () => this.props.checkValidForm())
  }

  checkSameIcon = (icon) => {
    let color = 'black';

    this.state.sellectedIcons.map(item => {
      if (item && (item == icon.iconName)) {
        color = 'gray'
      }
    })
    return color;
  };

  render() {
    const {
      iconsModal,
      icons,
      pickedIcon,
      sellectedIcons
    } = this.state;

    return (
      <div className='icon-picker'>
        <div className="random-hero-pick" onClick={() => this.pickRandomIcon()}>
          <FontAwesomeIcon icon={faRandom} />
          random
        </div>
        <div className="icon-picker__icon">
          {
            pickedIcon ?
              <FontAwesomeIcon icon={pickedIcon} size={'2x'} /> :
              <p className="text-center">
                '.__.'
              </p>
          }
        </div>
        <button onClick={() => this.toggleState('iconsModal')} >pick</button>

        <Modal isOpen={iconsModal}
          toggle={() => this.toggleState('iconsModal')}
        >

          <ModalHeader toggle={() => this.toggleState('iconsModal')}>Pick icon</ModalHeader>
          <ModalBody>
            {icons.map((icon, index) => {

              // sellectedIcons.length && sellectedIcons.map(item => {
              //   // if (item = icon) {
              //   //   color = 'gray'
              //   // } else {
              //   //   color = 'black'
              //   // }
              // })

              return <button
                key={index}
                className="btn-icon"
                color={this.checkSameIcon(icon)}
                onClick={() => this.selectIcon(icon)}
                disabled={
                  this.checkSameIcon(icon) == 'gray' ? true : false
                }
              >
                <FontAwesomeIcon


                  icon={icon}
                  size={'3x'}


                />
              </button>

            })}

          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default PickPlayerIcon;