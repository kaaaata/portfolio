import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from './stores/actions';
import { Cube } from './cube';
import { TopNav } from './coresite/TopNav';
import { Splash } from './coresite/Splash';
import { Projects } from './coresite/Projects';
import { CopyPaster } from './coresite/CopyPaster';
import { Clash } from './clash';
// import { Xiangqi } from './xiangqi';
import { trackStats } from './utils/graphql';
import { appCss } from './appCss';
import { Image, Filter } from './particles';
import { colors } from './styles';

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

      <Image src='snow_mountain_bg.jpg' width='100%' height='100vh'>
        <Filter
          color={colors.blackMediumDark}
          opacity={['/cube', '/copypaster'].includes(location.pathname) ? 0.75 : 0.35}
        />

        <div className='content_container'>
          <Switch>
            <Route
              exact path='/'
              render={() => <Splash />}
            />
            <Route
              exact path='/projects'
              render={() => <Projects />}
            />
            <Route
              exact path='/copypaster'
              render={() => <CopyPaster />}
            />
            <Route
              exact path='/cube'
              render={() => <Cube />}
            />
            {inDevelopment && ( // testing
              <Route
                exact path='/clash'
                render={() => <Clash />}
              />
            )}
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </div>
      </Image>
    </main>
  );
};

export const App = withRouter(AppComponent);
