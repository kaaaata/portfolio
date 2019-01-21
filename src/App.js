import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from './stores/actions';
import { colors, fonts, layout, mq } from './styles';
import CopyPaster from './CopyPaster';
import { RedirectRoute, Title } from './particles';
import TopNav from './TopNav';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const appCss = css`
  ${fonts.typeface}
  background: ${colors.black};
  min-width: 320px;
`;
const appContentCss = css`
  display: flex;
  max-width: 1200px;
  margin: auto;
  padding: ${layout.MAIN_PADDING}px;
  padding-top: ${layout.TOP_NAV_HEIGHT + layout.MAIN_PADDING}px;

  ${mq.phone(`
    padding: ${layout.MAIN_PADDING_PHONE}px;
    padding-top: ${layout.TOP_NAV_HEIGHT + layout.MAIN_PADDING_PHONE1}px;
  `)}

  ${mq.phoneAndTablet(`
    display: block;
  `)}
`;

class App extends React.Component {
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
        <section css={appContentCss}>
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
              render={() => <RedirectRoute />}
            />
          </Switch>
        </section>
        <Footer />
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentRoute: payload => dispatch(actions.setCurrentRoute(payload))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
