import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import * as actions from './stores/actions';
// import store from './stores/store';
import Home from './Home';
import About from './About';

// const mapStateToProps = (state) => ({
//   test: state.test,
// });
// const mapDispatchToProps = (dispatch) => ({
//   dispatchTest: (test) => dispatch(actions.test(test)),
// });

const App = () => (
  <main>
    <Switch>
      <Route
        exact path="/"
        render={() => <Home />}
      />
      <Route
        exact path="/about"
        render={() => <About />}
      />
    </Switch>
  </main>
);

export default withRouter(App);
