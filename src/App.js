import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import * as actions from './stores/actions';
// import store from './stores/store';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts, layout, mq } from './styles';
import AppListing from './AppListing';
import Snake from './Snake';
import CopyPaster from './CopyPaster';
import ContentContainer from './ContentContainer';
import { RedirectRoute } from './particles';
import TopNav from './TopNav';
import Footer from './Footer';
import SideNav from './SideNav';
// const mapStateToProps = (state) => ({
//   test: state.test,
// });
// const mapDispatchToProps = (dispatch) => ({
//   dispatchTest: (test) => dispatch(actions.test(test)),
// });

const appCss = css`
  ${fonts.typeface}
  background: ${colors.black};
  min-width: 320px;
`;

const appContentCss = css`
  display: flex;
  padding: ${layout.MAIN_PADDING}px;
  padding-top: ${layout.TOP_NAV_HEIGHT + layout.MAIN_PADDING}px;
  max-width: 1200px;
  margin: auto;

  ${mq.phoneAndTablet(`
    display: block;
  `)}
`;

const App = () => {
  return (
    <main id='app' css={appCss}>
      <TopNav />
      <section css={appContentCss}>
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <>
                <SideNav />
                <ContentContainer />
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
