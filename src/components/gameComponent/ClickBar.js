import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class ClickBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  setColor = () => {
    const { percentage } = this.props;
    let color = null;
    if (percentage <= 25) {
      color = "danger"
    }
    if (percentage >= 26 && percentage <= 50) {
      color = "warning"
    }
    if (percentage >= 51 && percentage <= 75) {
      color = "info"
    }
    if (percentage >= 76 && percentage <= 100) {
      color = "success"
    }
    return color;
  };

  render() {
    const { percentage, activeClickPlace } = this.props;

    return (
      <div className="click-bar" >
        <Progress
          striped
          animated
          color={this.setColor()}
          value={percentage}
        />
      </div>
    )
  }
}

export default ClickBar;