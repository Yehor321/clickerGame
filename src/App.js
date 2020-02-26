import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import './styles/App.scss';

const Menu = lazy(() => import('./components/menu/Menu'));
const PlayersFormEdit = lazy(() => import('./components/playersFormEdit/PlayersFormEdit'));
const GameComponent = lazy(() => import('./components/gameComponent/GameComponent'));
const GameOver = lazy(() => import('./components/gameOver/GameOver'));
const FortuneWheel = lazy(() => import('./components/gameComponent/FortuneWheel'));


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormPlayersEditing: false
    }
  }



  render() {
    return (
      <Provider store={store}>
        <Router>
          <Suspense fallback={"...loading"}>
            <ToastContainer />
            <div className="app">
              <Menu />
              <Switch>
                <Route exact path="/game" component={() => <GameComponent />} />
                <Route exact path="/" component={() => <PlayersFormEdit />} />
                <Route exact path="/gg" component={() => <GameOver />} />
                <Route exact path="/ff" component={() => <FortuneWheel />} />
              </Switch>
              {!isEmpty(store.getState().players.gameSchema.resultTable) && <GameOver />}
            </div>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;