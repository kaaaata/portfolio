import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import * as actions from './stores/actions';
// import store from './stores/store';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts } from './styles';
import AppListing from './AppListing';
import Snake from './Snake';
import CopyPaster from './CopyPaster';
import Home from './Home';
import { RedirectRoute } from './particles';
import TopNav from './TopNav';
import Footer from './Footer';
// const mapStateToProps = (state) => ({
//   test: state.test,
// });
// const mapDispatchToProps = (dispatch) => ({
//   dispatchTest: (test) => dispatch(actions.test(test)),
// });

const appCss = css`
  ${fonts.typeface}
  background: ${colors.dark};
  min-width: 320px;
`;

const appContentCss = css`
  padding: 40px;
  padding-top: ${40 + 65}px;
`;

const App = () => {
  document.title = 'Home | Catherine Han';

  return (
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
            exact path="/snake"
            render={() => (
              <Snake />
            )}
          />
          <Route
            render={() => (
              <RedirectRoute />
            )}
          />
        </Switch>
      </section>
      <Footer />
    </main>
  );
};

export default withRouter(App);
