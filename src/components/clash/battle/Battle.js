import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
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
} from '../PileOfCards';
import { YourPortrait, EnemyPortrait } from '../Portrait';
import { playFirstCardInRound } from '../gameplay/playFirstCardInRound';
import { BattleRewards } from './BattleRewards';

const perspectiveCss = css`perspective: 2000px;`;

export const Battle = () => {
  const { winner } = useSelector(state => ({
    winner: state.clashBattleStats.winner
  }));
  const dispatch = useDispatch();

  let interval = null;
  let renderActions = [];
  let isAnimating = false;

  const executeRenderAction = (action) => {
    if (action) {
      action.forEach(subAction => {
        if (subAction) {
          dispatch(actions[subAction.actionKey](subAction.payload));
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
    renderActions = playFirstCardInRound(index);
    const t1 = performance.now();
    console.log(`playCard took ${(t1 - t0).toFixed(3)} milliseconds.`);

    if (renderActions.length) {
      // later, if we want to allow pausing mid-animation, renderActions should be
      // refactored to be a Stack, and it should pop every time an action is executed.

      // instantly execute the first action, which will always be "move to stack"
      executeRenderAction(renderActions[0]);

      let i = 1;
      interval = setInterval(() => {
        executeRenderAction(renderActions[i]);

        if (++i === renderActions.length) {
          clearInterval(interval);
          isAnimating = false;
        }
      }, 500);
    } else {
      isAnimating = false;
    }
  };

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

      {winner && <BattleRewards />}
    </div>
  );
};
