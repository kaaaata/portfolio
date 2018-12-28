import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import * as actions from './stores/actions';
// import store from './stores/store';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { karla } from './styles';
import Home from './Home';
import WaterSidebar from './WaterSidebar';

// const mapStateToProps = (state) => ({
//   test: state.test,
// });
// const mapDispatchToProps = (dispatch) => ({
//   dispatchTest: (test) => dispatch(actions.test(test)),
// });

const appCss = css`
  ${karla}
`;

const App = () => (
  <main id='app' css={appCss}>
    <Switch>
      <Route
        exact path="/"
        render={() => (
          <>
            <WaterSidebar />
            <Home />
            <div style={{ height: '2000px' }}>
              filler div
            </div>
          </>
        )}
      />
    </Switch>
  </main>
);

export default withRouter(App);
