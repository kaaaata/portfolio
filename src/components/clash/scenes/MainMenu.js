import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text } from '../Text';

const mainMenuCss = css`
  .play {
    position: absolute;
    left: 100px;
    top: 350px;
  }

  .title {
    margin-top: 90px;
    text-align: center;
  }
`;

const MainMenuComponent = ({ setScene }) => (
  <div css={mainMenuCss}>
    <Text type='title' className='title'>
      12 Days Before the Dragon Attack
    </Text>
    <Text
      type='header'
      onClick={() => setScene('story')}
      className='play'
    >
      Play
    </Text>
  </div>
);

const mapDispatchToProps = dispatch => ({
  setScene: payload => dispatch(actions.setScene(payload))
});

export const MainMenu = connect(null, mapDispatchToProps)(MainMenuComponent);
