import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';

export const DrinkPotion = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [flavorText, setFlavorText] = useState('');
  const [townFeedText, setTownFeedText] = useState('');

  return (
    <EventModal
      title='Once a day, you can drink a potion.'
      image='blue_potion'
      page={page}
      pages={[
        {
          text: (
            <React.Fragment>
              You see three <span className='blue'>bottles</span> in front of you.
            </React.Fragment>
          ),
          options: [
            {
              name: 'Attack Potion',
              greenText: 'Gain +1 attack for the rest of the day.',
              onClick: () => {
                setFlavorText('stronger');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { attack: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Gained temporary boost: +1 Attack');
              }
            },
            {
              name: 'Magic Potion',
              greenText: 'Gain +1 magic for the rest of the day.',
              onClick: () => {
                setFlavorText('wiser');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { magic: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Gained temporary boost: +1 Magic');
              }
            },
            {
              name: 'Defense Potion',
              greenText: 'Gain +1 defense for the rest of the day.',
              onClick: () => {
                setFlavorText('tougher');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { defense: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Gained temporary boost: +1 Defense');
              }
            }
          ]
        },
        {
          text: (
            <React.Fragment>
              You feel a little <span className='yellow'>{flavorText}</span>.
            </React.Fragment>
          ),
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
