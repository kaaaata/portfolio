import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from './stores/actions';
import { Title, FlexContainer } from './particles';
import { CopyPaster, TopNav, Footer, Sidebar, MainContent } from './coresite';
import { Cube } from './cube';
// import { Song } from './song';
// import { Xiangqi } from './xiangqi';
import { trackStats } from './utils/graphql';
import { appCss, appContentCss } from './appCss';

class App extends React.Component {
  componentDidMount() {
    trackStats('visited_site');
  }

  componentWillReceiveProps(nextProps) {
    this.props.setCurrentRoute({
      pathname: nextProps.location.pathname,
      hash: nextProps.location.hash
    });
  }

  render() {
    return (
      <main id='app' css={appCss}>
        <Title />
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
            {/* <Route
              exact path="/song"
              render={() => <Song />}
            /> */}
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
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentRoute: payload => dispatch(actions.setCurrentRoute(payload))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
