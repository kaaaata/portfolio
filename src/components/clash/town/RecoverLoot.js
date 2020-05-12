import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';
import { CardLootModal } from '../modals/CardLootModal';

const RecoverLootComponent = ({ adjustPlayerGold, battleRewardGold, battleRewardCards, closeModal }) => {
  const [isCardLootModalOpen, setIsCardLootModalOpen] = useState(false);
  const rng = Math.random();
  const pages = [];

  if (rng < 0.5) {
    pages.push({
      text: 'You manage to scavenge a few coins.',
      options: [{
        name: 'Continue',
        goodText: `Receive ${battleRewardGold} gold.`,
        onClick: () => {
          adjustPlayerGold(battleRewardGold);
          closeModal();
        }
      }]
    });
  } else {
    pages.push({
      text: 'You find some cards.',
      options: [{
        name: 'Continue',
        goodText: "Take up to 2 cards from the enemy's deck",
        onClick: () => setIsCardLootModalOpen(true)
      }]
    })
  }

  return isCardLootModalOpen ? (
    <CardLootModal
      title="Take up to 2 cards from the enemy's deck"
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

const mapStateToProps = (state) => ({
  battleRewardGold: state.clashBattleCards.battleRewardGold,
  battleRewardCards: state.clashBattleCards.battleRewardCards
});
const mapDispatchToProps = (dispatch) => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload))
});

export const RecoverLoot = connect(mapStateToProps, mapDispatchToProps)(RecoverLootComponent);
