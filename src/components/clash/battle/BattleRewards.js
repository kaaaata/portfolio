import React, { useState } from 'react'
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from '../town/EventModal';
import { CardLootModal } from '../modals/CardLootModal';
import { Text } from '../Text';

export const BattleRewards = () => {
  const {
    didPlayerWin,
    winnerImage,
    battleRewardGold,
    battleRewardCards,
    winner,
    enemyType,
    enemyHueRotate
  } = useSelector(state => ({
    didPlayerWin: state.clashBattleStats.yourName === state.clashBattleStats.winner,
    winnerImage: state.clashBattleStats.winnerImage,
    battleRewardGold: state.clashBattleCards.battleRewardGold,
    battleRewardCards: state.clashBattleCards.battleRewardCards,
    winner: state.clashBattleStats.winner,
    enemyType: state.clashBattleStats.enemyType,
    enemyHueRotate: state.clashBattleStats.enemyHueRotate
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [isCardLootModalOpen, setIsCardLootModalOpen] = useState(false);
  
  const returnToTown = () => {
    if (enemyType === 'wave') {
      dispatch(actions.startNewDay());
      dispatch(actions.setCanRecoverLoot(didPlayerWin ? false : true));
    } else {
      dispatch(actions.setScene('town'));

    }
  };

  if (!winner) {
    return null;
  }

  return isCardLootModalOpen ? (
    <CardLootModal
      title='Battle Rewards'
      maxCardsToTake={2}
      cards={battleRewardCards}
      closeModal={returnToTown}
    />
  ) : (
    <EventModal
      title={didPlayerWin ? 'Victory!' : 'Defeat!'}
      image={winnerImage}
      imageProps={enemyHueRotate ? { filter: `hue-rotate(${enemyHueRotate}deg)` } : null}
      page={page}
      pages={[
        {
          text: didPlayerWin
            ? 'The enemy drops some gold.'
            : (
              <React.Fragment>
                <Text type='paragraph'>
                  You are forced to retreat!
                  <br /><br />
                  Maybe you can recover some loot tomorrow.
                </Text>
              </React.Fragment>
            ),
          options: [{
            name: 'Continue',
            goodText: didPlayerWin ? `Receive ${battleRewardGold} gold.` : 'Return to town.',
            onClick: () => {
              if (didPlayerWin) {
                dispatch(actions.adjustPlayerGold(battleRewardGold));
                setPage(2);
              } else {
                returnToTown();
              };
            }
          }]
        },
        {
          text: 'As the enemy flees, they drop some cards from their deck!',
          options: [{
            name: 'Continue',
            goodText: "Take up to 2 cards from the enemy's deck.",
            onClick: () => setIsCardLootModalOpen(true)
          }]
        }
      ]}
    />
  )
};
