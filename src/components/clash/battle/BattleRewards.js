import React, { useState } from 'react'
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';
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

  const [page, setPage] = useState('default');

  const battleDefeatGold = Math.floor(battleRewardGold / 4);
  
  const returnToTown = () => {
    const townFeedMessages = didPlayerWin ? [
      `You defeated: ${enemyName}`,
      `Received: ${battleRewardGold} gold`
    ] : [
      `You were defeated by: ${enemyName}`,
      `Lost: ${battleDefeatGold} gold`
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

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={didPlayerWin ? (
            <React.Fragment>
              The enemy drops some <span className='yellow'>gold.</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              The enemy <span className='red'>steals</span> some of your <span className='yellow'>gold.</span>
              <br /><br />
              {enemyType === 'wave' && 'Maybe you can recover some loot tomorrow.'}
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            greenText: didPlayerWin ? `Receive ${battleRewardGold} gold.` : '',
            redText: didPlayerWin ? '' : `Lose ${battleDefeatGold} gold.`,
            onClick: () => {
              if (didPlayerWin) {
                dispatch(actions.adjustPlayerGold(battleRewardGold));
                setPage('steal_cards');
              } else {
                dispatch(actions.adjustPlayerGold(-1 * battleDefeatGold));
                returnToTown();
              }
            }
          }]}
        />
      );
      break;
    case 'steal_cards':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              As the enemy flees, they drop some <span className='yellow'>cards</span> from their deck!
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Take up to 2 cards from the enemy\'s deck.',
            onClick: () => setPage('card_loot_modal')
          }]}
        />
      );
      break;
    default:
      break;
  }

  if (!winner) {
    return null;
  } else if (page === 'card_loot_modal') {
    return (
      <CardLootModal
        title='Battle Rewards'
        maxCardsToTake={2}
        cards={battleRewardCards}
        closeModal={returnToTown}
      />
    );
  } else {
    return (
      <EventModal
        title={didPlayerWin ? 'Victory!' : 'Defeat!'}
        image={winnerImage}
        imageProps={(enemyHueRotate && !didPlayerWin)
          ? { filter: `hue-rotate(${enemyHueRotate}deg)` }
          : null
        }
      >
        {pageComponent}
      </EventModal>
    );
  }
};
