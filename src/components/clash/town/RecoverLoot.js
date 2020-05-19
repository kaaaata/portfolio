import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';
import { CardLootModal } from '../modals/CardLootModal';

export const RecoverLoot = ({ closeModal }) => {
  const { battleRewardGold, battleRewardCards } = useSelector(state => ({
    battleRewardGold: state.clashBattleCards.battleRewardGold,
    battleRewardCards: state.clashBattleCards.battleRewardCards
  }), shallowEqual);
  const dispatch = useDispatch();

  const [isCardLootModalOpen, setIsCardLootModalOpen] = useState(false);
  const rng = Math.random();
  const pages = [];

  if (rng < 0.5) {
    pages.push({
      text: (
        <React.Fragment>
          You manage to scavenge some <span className='yellow'>gold.</span>
        </React.Fragment>
      ),
      options: [{
        name: 'Continue',
        greenText: `Receive ${battleRewardGold} gold.`,
        onClick: () => {
          dispatch(actions.adjustPlayerGold(battleRewardGold));
          dispatch(actions.addTownFeedText(`Recovered: ${battleRewardGold} gold`));
          closeModal();
        }
      }]
    });
  } else {
    pages.push({
      text: (
        <React.Fragment>
          You find a couple of abandoned <span className='yellow'>cards.</span>
        </React.Fragment>
      ),
      options: [{
        name: 'Continue',
        greenText: "Take up to 2 cards from the enemy's deck",
        onClick: () => setIsCardLootModalOpen(true)
      }]
    })
  }

  return isCardLootModalOpen ? (
    <CardLootModal
      title='Recover Loot'
      maxCardsToTake={2}
      cards={battleRewardCards}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title="You search yesterday's battlefield for abandoned loot."
      image='scavenge'
      page={1}
      pages={pages}
    />
  );
};
