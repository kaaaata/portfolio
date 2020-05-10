import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from './EventModal';

const ReceiveBlessingComponent = ({ adjustPlayerStats, adjustPlayerGold, closeModal }) => {
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
              goodEffect: 'Gain +1 Attack.',
              onClick: () => {
                setPage2Text('You feel a bit stronger.');
                setPage(2);
                adjustPlayerStats({ attack: 1 });
              }
            },
            {
              name: 'Blessing of Wisdom',
              goodEffect: 'Gain +1 Magic.',
              onClick: () => {
                setPage2Text('You feel a bit wiser.');
                setPage(2);
                adjustPlayerStats({ magic: 1 });
              }
            },
            {
              name: 'Blessing of Protection',
              goodEffect: 'Gain +1 Defense.',
              onClick: () => {
                setPage2Text('You feel a bit tougher.');
                setPage(2);
                adjustPlayerStats({ defense: 1 });
              }
            },
            {
              name: 'Blessing of Wall Street',
              goodEffect: 'Gain 300 gold.',
              onClick: () => {
                setPage2Text('Gold rains from the sky!');
                setPage(2);
                adjustPlayerGold(300);
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

const mapDispatchToProps = (dispatch) => ({
  adjustPlayerStats: payload => dispatch(actions.adjustPlayerStats(payload)),
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload))
});

export const ReceiveBlessing = connect(null, mapDispatchToProps)(ReceiveBlessingComponent);
