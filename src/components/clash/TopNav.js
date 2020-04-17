import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../stores/actions';
import { FlexContainer, Image } from '../particles';
import { Attributes } from './Attributes';
import { Gold } from './Gold';

const topNavCss = css`
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 20px;
  width: 100%;

  .attributes {
    margin-left: 20px;
    width: 110px;
    font-size: 26px;
  }

  .gold {
    margin-left: 40px;
  }
`;

export const TopNavComponent = ({
  player
}) => {
  return (
    <FlexContainer
      alignItems='center'
      _css={topNavCss}
    >
      {player && (
        <Image
          src={`/clash/${player.image}.png`}
          width={20}
          height={35}
        />
      )}
      {player && (
        <Attributes
          attack={player.attack}
          magic={player.magic}
          defense={player.defense}
        />
      )}
      {player && <Gold value={player.gold} />}
    </FlexContainer>
  );
};

const mapStateToProps = (state) => ({
  player: state.clashPlayer
});

export const TopNav = connect(mapStateToProps)(TopNavComponent);
