import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal } from '../EventModal';

const possiblePotions = [
  { name: 'Attack Potion', stat: 'attack', flavorText: 'stronger' },
  { name: 'Magic Potion', stat: 'magic', flavorText: 'wiser' },
  { name: 'Defense Potion', stat: 'defense', flavorText: 'tougher' },
  { name: 'Explosive Potion', stat: null, flavorText: null }
];

export const MysteriousPotion = ({ rng, closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const potion = possiblePotions[Math.floor(rng * 4)];

  return (
    <EventModal
      title='Mysterious Potion'
      image='mysterious_potion'
      page={page}
      pages={[
        {
          text: (
            <React.Fragment>
              You stumble across a mysterious
              <span className='blue'> blue potion. </span>
              It looks like someone accidentally dropped it.
              <br /><br />
              You don't recognize it, but it would be a <span className='violet'>shame</span> to leave it behind....
            </React.Fragment>
          ),
          options: [
            {
              name: 'Drink It',
              goodText: '75%: temporary stat boost.',
              badText: '25%: no effect.',
              onClick: () => setPage(potion.name === 'Explosive Potion' ? 2 : 3)
            },
            {
              name: 'Keep It',
              goodText: 'Add the potion to your deck.',
              onClick: () => setPage(4)
            },
            {
              name: 'Leave it',
              onClick: () => setPage(5)
            }
          ]
        },
        {
          text: (
            <React.Fragment>
              You attempt to drink the potion, but it <span className='red'>explodes</span> violently! It must have been a weirdly colored <span className='red'>Explosive Potion</span>.
              <br /><br />
              Unfortunately, you are now left with nothing but a handful of glass dust.
            </React.Fragment>
          ),
          options: [{
            name: 'Continue',
            onClick: closeModal
          }]
        },
        {
          text: (
            <React.Fragment>
              You drink the potion, and realize it's actually just a weirdly colored <span className='blue'>{potion.name}!</span>
              <br /><br />
              You feel a little <span className='yellow'>{potion.flavorText}</span>.
            </React.Fragment>
          ),
          options: [{
            name: 'Continue',
            goodText: `Gain +1 ${potion.stat} for the rest of the day.`,
            onClick: () => {
              dispatch(actions.setStats({
                stats: { [potion.stat]: 1 },
                type: 'bonuses',
                player: 'you',
                operation: 'adjust'
              }));
              dispatch(actions.addTownFeedText(
                `Gained temporary boost: +1 ${potion.stat}`
              ));
              closeModal();
            }
          }]
        },
        {
          text: (
            <React.Fragment>
              You take the potion and examine it closely. Turns out, it's actually just a weirdly colored <span className='blue'>{potion.name}!</span>
            </React.Fragment>
          ),
          options: [{
            name: 'Continue',
            goodText: `Receive card: ${potion.name}.`,
            onClick: () => {
              dispatch(actions.addCardsToCollection(potion.name));
              closeModal();
            }
          }]
        },
        {
          text: 'You decide not to interact with the potion.',
          options: [{
            name: 'Continue',
            onClick: closeModal
          }]
        }
      ]}
    />
  );
};
