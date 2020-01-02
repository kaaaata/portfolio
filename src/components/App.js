import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from './stores/actions';
import { FlexContainer } from './particles';
import {
  CopyPaster,
  TopNav,
  Footer,
  Sidebar,
  MainContent
} from './coresite';
import { Cube } from './cube';
import { Clash } from './clash';
// import { Xiangqi } from './xiangqi';
import { trackStats } from './utils/graphql';
import { appCss, appContentCss } from './appCss';

const AppComponent = ({
  setCurrentRoute, // from withRouter
  location // from withRouter
}) => {
  useEffect(() => {
    trackStats('visited_site');
    setCurrentRoute({
      pathname: location.pathname,
      hash: location.hash
    });
  }, [location.pathname, location.hash]);

  return (
    <main id='app' css={appCss}>
      <TopNav />
      <Sidebar />
      <FlexContainer _css={appContentCss}>
        <Switch>
          <Route
            exact path="/"
            render={() => <MainContent />}
          />
          <Route
            exact path="/copypaster"
            render={() => <CopyPaster />}
          />
          <Route
            exact path="/cube"
            render={() => <Cube />}
          />
          <Route
            exact path="/clash"
            render={() => <Clash />}
          />
          {/* <Route
            exact path="/xiangqi"
            render={() => <Xiangqi />}
          /> */}
          <Route
            render={() => <Redirect to='/' />}
          />
        </Switch>
      </FlexContainer>
      <Footer />
    </main>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentRoute: payload => dispatch(actions.setCurrentRoute(payload))
});

export const App = withRouter(connect(null, mapDispatchToProps)(AppComponent));
