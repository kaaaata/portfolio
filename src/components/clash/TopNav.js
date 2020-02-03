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
  position: absolute;
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
  player: state.clashPlayers[state.clashPlayers.playerId]
});
const mapDispatchToProps = dispatch => ({
  setYourDeck: payload => dispatch(actions.setYourDeck(payload)),
  setYourDiscard: payload => dispatch(actions.setYourDiscard(payload)),
  setYourBanish: payload => dispatch(actions.setYourBanish(payload)),
  setYourHand: payload => dispatch(actions.setYourHand(payload)),
  setEnemyDeck: payload => dispatch(actions.setEnemyDeck(payload)),
  setEnemyDiscard: payload => dispatch(actions.setEnemyDiscard(payload)),
  setEnemyBanish: payload => dispatch(actions.setEnemyBanish(payload)),
  setEnemyHand: payload => dispatch(actions.setEnemyHand(payload)),
  setStack: payload => dispatch(actions.setStack(payload)),
  setYourShields: payload => dispatch(actions.setYourShields(payload)),
  setEnemyShields: payload => dispatch(actions.setEnemyShields(payload)),
  setYourTemporaryStats: payload => dispatch(actions.setYourTemporaryStats(payload)),
  setEnemyTemporaryStats: payload => dispatch(actions.setEnemyTemporaryStats(payload)),
  setWinner: payload => dispatch(actions.setWinner(payload)),
});

export const TopNav = connect(mapStateToProps, mapDispatchToProps)(TopNavComponent);
