import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';

export const ReceiveBlessing = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [flavorText, setFlavorText] = useState('');
  const [townFeedText, setTownFeedText] = useState('');

  return (
    <EventModal
      title='Congratulations! You have received a blessing.'
      image='blessing'
      page={page}
      pages={[
        {
          text: (
            <React.Fragment>
              The <span className='green'>cat gods</span> descend from <span className='green'>cat heaven</span> to bestow an almighty <span className='blue'>blessing</span> upon your head!
            </React.Fragment>
          ),
          options: [
            {
              name: 'Blessing of Strength',
              goodText: 'Gain +1 attack permanently.',
              onClick: () => {
                setFlavorText('stronger');
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
              goodText: 'Gain +1 magic permanently.',
              onClick: () => {
                setFlavorText('wiser');
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
              goodText: 'Gain +1 defense permanently.',
              onClick: () => {
                setFlavorText('tougher');
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
                setFlavorText('Gold rains from the sky!');
                setPage(2);
                dispatch(actions.adjustPlayerGold(300));
                setTownFeedText('Received blessing: 300 gold');
              }
            }
          ]
        },
        {
          text: flavorText === 'Gold rains from the sky!' ? (
            <React.Fragment>
              <span className='yellow'>Gold</span> rains from the sky!
            </React.Fragment>
          ) : (
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
