import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal } from '../EventModal';
import { MonsterPreview } from '../../modals/MonsterPreview';
import { eventMonsters } from '../../monsters/monsters';

export const TreasureSlime = ({ rng, closeModal }) => {
  const { hasKey, gold } = useSelector(state => ({
    hasKey: state.clashPlayer.deck.includes('Strange Key'),
    gold: state.clashPlayer.gold
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [finalPageText, setFinalPageText] = useState('You leave the slime alone.');
  const [openedChestWith, setOpenedChestWith] = useState('key');
  const [didAttack, setDidAttack] = useState(false);

  return didAttack ? (
    <MonsterPreview
      title='You attack the slime!'
      monsterOverride={eventMonsters['Treasure Slime']}
      closeModal={closeModal}
    />
  ) : (
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
              badText: hasKey ? 'Lose card: Strange Key.' : 'Requires card: Strange key.',
              goodText: hasKey ? 'Gain a material reward.' : '',
              onClick: () => {
                setPage(2);
                dispatch(actions.removeCardsFromCollection('Strange Key'));
              }
            },
            {
              name: 'Give Gold',
              isDisabled: gold < 50,
              badText: gold < 50 ? 'Lose 50 gold.' : 'Requires: 50 gold.',
              goodText: gold < 50 ? 'Gain a material reward.' : '',
              onClick: () => {
                setPage(2);
                setOpenedChestWith('gold');
                dispatch(actions.adjustPlayerGold(-50));
              }
            },
            {
              name: 'Attack',
              goodText: 'Fight enemy: Treasure Slime.',
              onClick: () => setDidAttack(true)
            },
            {
              name: 'Leave',
              onClick: () => setPage(3)
            }
          ]
        },
        {
          text: openedChestWith === 'key' ? (
            <React.Fragment>
              You toss the slime your <span className='yellow'>Strange Key</span>. Extending a <span className='violet'>slimy tentacle</span>, the slime absorbs the key into its body!
              <br /><br />
              The chest is unlocked, and riches pour out!
            </React.Fragment>
          ) : (
            <React.Fragment>
              You toss the slime a handful of <span className='yellow'>coins</span>. Extending a <span className='violet'>slimy tentacle</span>, the slime absorbs the gold into its body!
              <br /><br />
              The slime coughs up some loot in thanks.
            </React.Fragment>
          ),
          options: [{
            name: 'Take Loot',
            goodText: 'Gain 100 gold.',
            onClick: () => {
              dispatch(actions.adjustPlayerGold(100));
              setFinalPageText('You make off with the loot.');
              setPage(3);
            }
          }]
        },
        {
          text: finalPageText,
          options: [{
            name: 'Continue',
            onClick: closeModal
          }]
        }
      ]}
    />
  );
};
