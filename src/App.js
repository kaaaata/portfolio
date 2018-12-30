import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import * as actions from './stores/actions';
// import store from './stores/store';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts } from './styles';
import AppListing from './AppListing';

// const mapStateToProps = (state) => ({
//   test: state.test,
// });
// const mapDispatchToProps = (dispatch) => ({
//   dispatchTest: (test) => dispatch(actions.test(test)),
// });

const appCss = css`
  ${fonts.karla}
  background: ${colors.slateDark};
  width: 100%;
  height: 100%;
  min-width: 320px;
  padding: 40px;
`;

const App = () => (
  <main id='app' css={appCss}>
    <Switch>
      <Route
        exact path="/"
        render={() => (
          <AppListing />
        )}
      />
    </Switch>
  </main>
);

export default withRouter(App);
