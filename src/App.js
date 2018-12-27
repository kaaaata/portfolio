import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import * as actions from './stores/actions';
// import store from './stores/store';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { karla } from './styles';
import Home from './Home';

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
  <main css={appCss}>
    <Switch>
      <Route
        exact path="/"
        render={() => <Home />}
      />
    </Switch>
  </main>
);

export default withRouter(App);
