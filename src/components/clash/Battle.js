import { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../stores/actions';
import {
  YourDeck,
  YourDiscard,
  YourBanish,
  EnemyDeck,
  EnemyDiscard,
  EnemyBanish,
  YourHand,
  EnemyHand,
  Stack
} from './PileOfCards';
import { YourPortrait, EnemyPortrait } from './Portrait';
import { playFirstCardInRound } from './gameplay/playFirstCardInRound';
import { Modal } from './modals/Modal';
import { BattleRewards } from './modals/BattleRewards';
import { Image } from '../particles';

const perspectiveCss = css`perspective: 2000px;`;

const BattleComponent = (props) => {
  const [activeModal, setActiveModal] = useState(null);
  const { winner, winnerImage } = props;
  let modalComponent = null;
  let interval = null;
  let actions = [];
  let isAnimating = false;

  useEffect(() => {
    if (winner) {
      setActiveModal('win_or_lose');
    }
  }, [winner]);

  const executeRenderAction = (action) => {
    if (action) {
      action.forEach(subAction => {
        if (subAction) {
          props[subAction.actionKey](subAction.payload);
        }
      });
    }
  };

  const handleClickCardInYourHand = (index) => {
    if (isAnimating || winner) {
      return;
    }

    isAnimating = true;
    const t0 = performance.now();
    actions = playFirstCardInRound(index);
    const t1 = performance.now();
    console.log(`playCard took ${(t1 - t0).toFixed(3)} milliseconds.`);

    if (actions.length > 1) {
      // later, if we want to allow pausing mid-animation, actions should be
      // refactored to be a Stack, and it should pop every time an action is executed.

      // instantly execute the first action, which will always be "move to stack"
      executeRenderAction(actions[0]);

      let i = 1;
      interval = setInterval(() => {
        executeRenderAction(actions[i]);

        if (++i === actions.length) {
          clearInterval(interval);
          isAnimating = false;
        }
      }, 500);
    } else {
      isAnimating = false;
    }
  };

  switch (activeModal) {
    case 'win_or_lose':
      modalComponent = (
        <Modal
          title={`${winner} wins!`}
          continueOptions={[
            { text: 'Battle Rewards', color: 'green', onClick: () => setActiveModal('battle_rewards') }
          ]}
        >
          <Image
            src={`/clash/${winnerImage}.png`}
            height={200}
            width={200}
            size='contain'
          />
        </Modal>
      );
      break;
    case 'battle_rewards':
      modalComponent = <BattleRewards />;
      break;
    default:
      break;
  }

  return (
    <div>
      <EnemyPortrait />
      <EnemyHand />
      <div css={perspectiveCss}>
        <EnemyDeck />
        <EnemyDiscard />
        <EnemyBanish />
      </div>

      <Stack />

      <YourPortrait />
      <YourHand onClick={(index) => handleClickCardInYourHand(index)} />
      <div css={perspectiveCss}>
        <YourDeck />
        <YourDiscard />
        <YourBanish />
      </div>

      {modalComponent}
    </div>
  );
};

const mapStateToProps = (state) => ({
  winner: state.clashBattleStats.winner,
  winnerImage: state.clashBattleStats.winnerImage
});
const mapDispatchToProps = dispatch => ({
  // these are called from executeRenderAction
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
  setWinner: payload => dispatch(actions.setWinner(payload))
});

export const Battle = connect(mapStateToProps, mapDispatchToProps)(BattleComponent);
