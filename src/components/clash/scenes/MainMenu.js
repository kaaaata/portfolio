import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';

const mainMenuCss = css`
  h1 {
    font-size: 36px;
    cursor: pointer;
    position: absolute;
    left: 100px;
    top: 350px;
  }
`;

const MainMenuComponent = ({ setScene }) => (
  <div css={mainMenuCss}>
    <h1 onClick={() => setScene('map')}>Play</h1>
  </div>
);

const mapDispatchToProps = dispatch => ({
  setScene: payload => dispatch(actions.setScene(payload))
});

export const MainMenu = connect(null, mapDispatchToProps)(MainMenuComponent);
