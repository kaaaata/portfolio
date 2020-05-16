import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal } from '../EventModal';
import { sample } from 'lodash';

const possiblePotions = [
  { name: 'Attack Potion', stat: 'attack', flavorText: 'stronger' },
  { name: 'Magic Potion', stat: 'magic', flavorText: 'wiser' },
  { name: 'Defense Potion', stat: 'defense', flavorText: 'tougher' },
  { name: 'Explosive Potion', stat: null, flavorText: null }
];

export const MysteriousPotion = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [page2Text, setPage2Text] = useState('');
  const [page3Text, setPage3Text] = useState('');

  const potion = sample(possiblePotions);

  return (
    <EventModal
      title='Mysterious Potion'
      image='mysterious_potion'
      page={page}
      pages={[
        {
          text: 'You stumble across a mysterious blue potion. It looks like someone accidentally dropped it. You don\'t recognize it, but it would be a shame to leave it behind....',
          options: [
            {
              name: 'Drink It',
              goodText: '75%: temporary stat boost.',
              badText: '25%: no effect.',
              onClick: () => {
                if (potion.name === 'Explosive Potion') {
                  setPage2Text('You put the vial to your lips, but it explodes violently! It must have been a differently colored Explosive Potion. Unfortunately, you are now left with nothing but a handful of glass shards.');
                  setPage(2);
                } else {
                  setPage2Text(`You put the vial to your lips, and drink. It tastes exactly like a ${potion.name}! You feel a little ${potion.flavorText}.`);
                  setPage(2);
                  dispatch(actions.setStats({
                    stats: { [potion.stat]: 1 },
                    type: 'bonuses',
                    player: 'you',
                    operation: 'adjust'
                  }));
                  dispatch(actions.addTownFeedText(
                    `Gained temporary boost: +1 ${potion.stat[0]}${potion.stat.slice(1)}`
                  ));
                }
              }
            },
            {
              name: 'Keep It',
              goodText: 'Add the potion to your deck.',
              onClick: () => {
                setPage3Text(`You take the potion in your hands and examine it. Somehow, its smell reminds you of that of an ${potion.name}.`);
                setPage(3);
              }
            }
          ]
        },
        {
          text: page2Text,
          options: [{
            name: 'Continue',
            onClick: closeModal
          }]
        },
        {
          text: page3Text,
          options: [
            {
              name: 'Keep It',
              goodText: `Add ${potion.name} to your deck.`,
              onClick: () => {
                dispatch(actions.addCardsToCollection(potion.name));
                closeModal();
              }
            },
            {
              name: 'Leave It',
              onClick: closeModal
            }
          ]
        },
      ]}
    />
  );
};
