import React, { useState } from 'react'
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from '../town/EventModal';
import { CardLootModal } from '../modals/CardLootModal';

export const BattleRewards = () => {
  const {
    didPlayerWin,
    winnerImage,
    battleRewardGold,
    battleRewardCards,
    winner,
    enemyType,
    enemyHueRotate,
    enemyName
  } = useSelector(state => ({
    didPlayerWin: state.clashBattleStats.yourName === state.clashBattleStats.winner,
    winnerImage: state.clashBattleStats.winnerImage,
    battleRewardGold: state.clashBattleCards.battleRewardGold,
    battleRewardCards: state.clashBattleCards.battleRewardCards,
    winner: state.clashBattleStats.winner,
    enemyType: state.clashBattleStats.enemyType,
    enemyHueRotate: state.clashBattleStats.enemyHueRotate,
    enemyName: state.clashBattleStats.enemyName
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [isCardLootModalOpen, setIsCardLootModalOpen] = useState(false);
  
  const returnToTown = () => {
    const townFeedMessages = didPlayerWin ? [
      `You defeated: ${enemyName}`,
      `Received: ${battleRewardGold} gold`
    ] : [
      `You were defeated by: ${enemyName}`
    ];
    if (enemyType === 'wave') {
      dispatch(actions.startNewDay({ feedInitialMessages: townFeedMessages }));
      dispatch(actions.setCanRecoverLoot(didPlayerWin ? false : true));
    } else {
      dispatch(actions.addTownFeedText(townFeedMessages));
      dispatch(actions.setScene('town'));
    }
    dispatch(actions.setCanVisitShop(true));
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
      imageProps={(enemyHueRotate && !didPlayerWin)
        ? { filter: `hue-rotate(${enemyHueRotate}deg)` }
        : null
      }
      page={page}
      pages={[
        {
          text: didPlayerWin ? (
            <React.Fragment>
              The enemy drops some <span className='yellow'>gold.</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              You are forced to <span className='red'>retreat!</span>
              <br /><br />
              {enemyType === 'wave' && 'Maybe you can recover some loot tomorrow.'}
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
          text: (
            <React.Fragment>
              As the enemy flees, they drop some <span className='yellow'>cards</span> from their deck!
            </React.Fragment>
          ),
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
