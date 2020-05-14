import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';

export const ReceiveBlessing = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [page2Text, setPage2Text] = useState('');
  const [townFeedText, setTownFeedText] = useState('');

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
                dispatch(actions.setStats({
                  stats: { attack: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Received blessing: +1 Attack');
              }
            },
            {
              name: 'Blessing of Wisdom',
              goodText: 'Gain +1 Magic.',
              onClick: () => {
                setPage2Text('You feel a bit wiser.');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { magic: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Received blessing: +1 Magic');
              }
            },
            {
              name: 'Blessing of Protection',
              goodText: 'Gain +1 Defense.',
              onClick: () => {
                setPage2Text('You feel a bit tougher.');
                setPage(2);
                dispatch(actions.setStats({
                  stats: { defense: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
                setTownFeedText('Received blessing: +1 Defense');
              }
            },
            {
              name: 'Blessing of Wall Street',
              goodText: 'Gain 300 gold.',
              onClick: () => {
                setPage2Text('Gold rains from the sky!');
                setPage(2);
                dispatch(actions.adjustPlayerGold(300));
                setTownFeedText('Received blessing: 300 gold');
              }
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
