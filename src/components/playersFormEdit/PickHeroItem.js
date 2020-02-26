import React, { Component, lazy } from 'react';

import { iconsArr, genereateRandomNumber } from '../../utils/constants';
import { isEmpty } from 'lodash';

const PickPlayerIcon = lazy(() => import('./PickPlayerIcon'));

class PickHeroItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allIconsNames: [],
      usedIconsArr: [],
      id: null
    }
  }

  onChange = (e) => {
    switch (e.target.name) {
      case "playerName":
        this.props.setPlayerField(this.props.index, 'name', e.target.value)
        break;
      default:
        break;
    }
    this.props.checkValidForm();
  };

  componentDidMount() {
    this.setState({
      allIconsNames: this.getIconsNameFromArr()
    })
  }

  getIconsNameFromArr = () => {
    return iconsArr.map(icon => {
      return icon
    })
  }

  setIconToUsedFunc = () => {
    let icons = [];

    this.props.players.map(player => {
      if (player.icon) { icons.push(player.icon) }
    })

    let filteredIconsToRandom = this.getIconsNameFromArr();
    if (icons.length) {
      icons.forEach(ic => {
        filteredIconsToRandom.filter((icon, index) => {
          ic.iconName === icon.iconName && filteredIconsToRandom.splice(index, 1)
        })
      })
    }

    this.setState({
      ...this.state,
      usedIconsArr: icons,
      allIconsNames: filteredIconsToRandom,
      id: genereateRandomNumber(0, this.state.allIconsNames.length - 1)
    }, () => {
      this.props.setPlayerField(this.props.index, 'icon', this.state.allIconsNames[this.state.id])
    })
    return this.state.allIconsNames[this.state.id]
  }

  render() {
    const { index, players } = this.props;
    return (
      <div className="pick-hero__item mt-4">
        <span>{index + 1 + ' .'}</span>
        <fieldset>

          <div className="input-group">
            <label className="label-border">
              <span className="border"></span>
              <label className="label-bg">

                <input
                  className="input-common"
                  type="text"
                  maxLength={15}
                  name="playerName"
                  onChange={this.onChange}
                />
              </label>
            </label>

          </div>
        </fieldset>
        <PickPlayerIcon
          checkValidForm={this.props.checkValidForm}
          players={players}
          index={this.props.index}
          setPlayerField={this.props.setPlayerField}
          usedIconSetToArr={this.state.allIconsNames}
          setIconToUsedFunc={this.setIconToUsedFunc}
        />
      </div>
    )
  }
}
export default PickHeroItem;