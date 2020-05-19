import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal } from '../EventModal';
import { MonsterPreview } from '../../modals/MonsterPreview';
import { eventMonsters } from '../../monsters/monsters';
import { TreasureChest } from './TreasureChest';

export const TreasureSlime = ({ rng, closeModal }) => {
  const { hasKey, gold } = useSelector(state => ({
    hasKey: state.clashPlayer.deck.includes('Strange Key'),
    gold: state.clashPlayer.gold
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [activeModal, setActiveModal] = useState(null);

  if (activeModal === 'monster_preview') {
    return (
      <MonsterPreview
        title='You attack the slime!'
        monsterOverride={eventMonsters['Treasure Slime']}
        closeModal={closeModal}
      />
    );
  } else if (activeModal === 'treasure_chest') {
    return (
      <TreasureChest rng={rng} closeModal={closeModal} />
    );
  } else {
    return (
      <EventModal
        title='Treasure Slime'
        image='treasure_slime_event'
        page={page}
        pages={[
          {
            text: (
              <React.Fragment>
                You encounter a treasure chest enveloped by a <span className='yellow'>giant yellow slime!</span>
                <br /><br />
                It notices you, but doesn't move.
              </React.Fragment>
            ),
            options: [
              {
                name: 'Give Key',
                isDisabled: !hasKey,
                badText: hasKey ? 'Lose card: Strange Key.' : 'Requires card: Strange Key.',
                goodText: hasKey ? 'Open the chest.' : '',
                badTextFirst: true,
                onClick: () => {
                  setPage(2);
                  dispatch(actions.removeCardsFromCollection('Strange Key'));
                }
              },
              {
                name: 'Give Gold',
                isDisabled: gold < 100,
                badText: gold < 100 ? 'Requires: 100 gold.' : 'Lose 100 gold.',
                goodText: gold < 100 ? '' : 'Gain 150 gold.',
                badTextFirst: true,
                onClick: () => {
                  setPage(3);
                  dispatch(actions.adjustPlayerGold(-100));
                  dispatch(actions.addTownFeedText('Lost: 100 gold'));
                }
              },
              {
                name: 'Attack',
                goodText: 'Fight enemy: Treasure Slime.',
                onClick: () => setActiveModal('monster_preview')
              },
              {
                name: 'Leave',
                onClick: () => setPage(4)
              }
            ]
          },
          {
            text: (
              <React.Fragment>
                You toss the slime your <span className='yellow'>Strange Key</span>. Extending a <span className='violet'>slimy tentacle</span>, the slime absorbs the key into its body!
                <br /><br />
                The chest is <span className='green'>unlocked!</span>
              </React.Fragment>
            ),
            options: [{
              name: 'Open Chest',
              onClick: () => setActiveModal('treasure_chest')
            }]
          },
          {
            text: (
              <React.Fragment>
                You toss the slime a handful of <span className='yellow'>coins</span>. Extending a <span className='violet'>slimy tentacle</span>, the slime absorbs the gold into its body!
                <br /><br />
                The slime coughs up some <span className='yellow'>loot</span> in thanks.
              </React.Fragment>
            ),
            options: [{
              name: 'Take Loot',
              goodText: 'Receive 150 gold.',
              onClick: () => {
                dispatch(actions.adjustPlayerGold(150));
                dispatch(actions.addTownFeedText('Received: 150 gold'));
                closeModal();
              }
            }]
          },
          {
            text: 'You leave the slime alone.',
            options: [{
              name: 'Continue',
              onClick: closeModal
            }]
          }
        ]}
      />
    );
  }
};
