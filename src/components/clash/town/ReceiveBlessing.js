import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';

export const ReceiveBlessing = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [page2Text, setPage2Text] = useState('');

  return (
    <EventModal
      title='Congratulations! You have received a blessing.'
      image='blessing'
      page={page}
      pages={[
        {
          text: 'The cat gods descend from cat heaven to bestow an almighty blessing upon your head!',
          options: [
            {
              name: 'Blessing of Strength',
              goodText: 'Gain +1 Attack.',
              onClick: () => {
                setPage2Text('You feel a bit stronger.');
                setPage(2);
                dispatch(actions.adjustPlayerStats({ attack: 1 }));
              }
            },
            {
              name: 'Blessing of Wisdom',
              goodText: 'Gain +1 Magic.',
              onClick: () => {
                setPage2Text('You feel a bit wiser.');
                setPage(2);
                dispatch(actions.adjustPlayerStats({ magic: 1 }));
              }
            },
            {
              name: 'Blessing of Protection',
              goodText: 'Gain +1 Defense.',
              onClick: () => {
                setPage2Text('You feel a bit tougher.');
                setPage(2);
                dispatch(actions.adjustPlayerStats({ defense: 1 }));
              }
            },
            {
              name: 'Blessing of Wall Street',
              goodText: 'Gain 300 gold.',
              onClick: () => {
                setPage2Text('Gold rains from the sky!');
                setPage(2);
                dispatch(actions.adjustPlayerGold(300));
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
        }
      ]}
    />
  );
};
