import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
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

const inDevelopment = process.env.NODE_ENV !== 'production';

const AppComponent = ({
  location // from withRouter
}) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    trackStats('visited_site');
    dispatch(actions.setCurrentRoute({
      pathname: location.pathname,
      hash: location.hash
    }));
  }, [location.pathname, location.hash, dispatch]);
  return (
    <main id='app' css={appCss}>
      <TopNav />
      <Sidebar />
      <FlexContainer
        justifyContent='center'
        _css={appContentCss(location.pathname)}
      >
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
          {inDevelopment && ( // testing
            <Route
              exact path="/clash"
              render={() => <Clash />}
            />
          )}
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

export const App = withRouter(AppComponent);
