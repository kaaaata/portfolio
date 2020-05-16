import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';

export const DrinkPotion = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [page2Text, setPage2Text] = useState('');
  const [townFeedText, setTownFeedText] = useState('');
  const [image, setImage] = useState('attack_potion');

  return (
    <EventModal
      title='Once a day, you can drink a potion.'
      image={image}
      page={page}
      pages={[
        {
          text: 'The stat boost lasts until the end of the day.',
          options: [
            {
              name: 'Attack Potion',
              goodText: 'Gain +1 Attack.',
              onClick: () => {
                setPage2Text('You feel a little stronger.');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { attack: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Gained temporary boost: +1 Attack');
              },
              onMouseEnter: () => setImage('attack_potion')
            },
            {
              name: 'Magic Potion',
              goodText: 'Gain +1 Magic.',
              onClick: () => {
                setPage2Text('You feel a little wiser.');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { magic: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Gained temporary boost: +1 Magic');
              },
              onMouseEnter: () => setImage('magic_potion')
            },
            {
              name: 'Defense Potion',
              goodText: 'Gain +1 Defense.',
              onClick: () => {
                setPage2Text('You feel a little tougher.');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { defense: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Gained temporary boost: +1 Defense');
              },
              onMouseEnter: () => setImage('defense_potion')
            }
          ]
        },
        {
          text: page2Text,
          options: [{
            name: 'Continue',
            onClick: () => {
              dispatch(actions.addTownFeedText(townFeedText));
              closeModal();
            }
          }]
        }
      ]}
    />
  );
};
