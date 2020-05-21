import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { CardLootModal } from '../modals/CardLootModal';

export const RecoverLoot = ({ closeModal }) => {
  const { battleRewardGold, battleRewardCards } = useSelector(state => ({
    battleRewardGold: state.clashBattleCards.battleRewardGold,
    battleRewardCards: state.clashBattleCards.battleRewardCards
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          key={1}
          text={(
            <React.Fragment>
              You <span className='yellow'>search</span> yesterday's battlefield for abandoned loot....
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            greenText: '50%: find gold. 50%: find cards.',
            onClick: () => setPage(Math.random() < 0.5 ? 'recover_gold' : 'recover_cards')
          }]}
        />
      );
      break;
    case 'recover_gold':
      pageComponent = (
        <EventModalPage
          key={2}
          text={(
            <React.Fragment>
              You manage to scavenge some <span className='yellow'>gold.</span>
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            greenText: `Receive ${battleRewardGold} gold.`,
            onClick: () => {
              dispatch(actions.adjustPlayerGold(battleRewardGold));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'recover_cards':
      pageComponent = (
        <EventModalPage
          key={3}
          text={(
            <React.Fragment>
              You find a couple of abandoned <span className='yellow'>cards.</span>
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            greenText: 'Take up to 2 cards from the enemy\'s deck',
            onClick: () => setPage('card_loot_modal')
          }]}
        />
      );
      break;
    default:
      break;
  }

  return page === 'card_loot_modal' ? (
    <CardLootModal
      title='Recover Loot'
      maxCardsToTake={2}
      cards={battleRewardCards}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title='Recover Loot'
      image='scavenge'
    >
      {pageComponent}
    </EventModal>
  );
};
