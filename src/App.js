import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import * as actions from './stores/actions';
// import store from './stores/store';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts } from './styles';
import AppListing from './AppListing';
import CopyPaster from './CopyPaster';
import Home from './Home';
import { RedirectRoute } from './particles';
import TopNav from './TopNav';
// const mapStateToProps = (state) => ({
//   test: state.test,
// });
// const mapDispatchToProps = (dispatch) => ({
//   dispatchTest: (test) => dispatch(actions.test(test)),
// });

const appCss = css`
  ${fonts.montserrat}
  background: ${colors.dark};
  line-height: 1.5;
  color: white;
  width: 100%;
  height: 100%;
  min-width: 320px;

  p {
    line-height: 1.5;
  }
`;

const appContentCss = css`
  width: 100%;
  height: 100%;
  padding: 40px;
  padding-top: ${40 + 65}px;
`;

const App = () => (
  <main id='app' css={appCss}>
    <TopNav />
    <section css={appContentCss}>
      <Switch>
        <Route
          exact path="/"
          render={() => (
            <>
              <Home />
              <AppListing />
            </>
          )}
        />
        <Route
          exact path="/copypaster"
          render={() => (
            <CopyPaster />
          )}
        />
        <Route
          render={() => (
            <RedirectRoute />
          )}
        />
      </Switch>
    </section>
  </main>
);

export default withRouter(App);
