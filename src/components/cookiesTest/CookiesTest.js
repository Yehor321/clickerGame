import React, { Component } from 'react';

class CookiesTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false
    }
  }

  getCookie = (name) => {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  render() {
    return (
      <div>
        <button onClick={() => console.log(this.getCookie("bool"))}>
          get Cookies
        </button>

        <input type="checkbox" checked={this.state.bool} onChange={(e) => this.setState({ bool: e.target.checked }, () => console.log(this.state.bool))} />
        <button
          onClick={() => {
            this.props.cookies.set(
              "bool",
              this.state.bool,
              // { path: '/' }
            );
          }}
        >Set cookie </button>
      </div>
    )
  }
}

export default CookiesTest;