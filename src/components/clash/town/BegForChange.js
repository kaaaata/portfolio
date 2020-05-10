import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { random } from 'lodash';
import { EventModal } from './EventModal';

const BegForChangeComponent = ({ adjustPlayerGold, closeModal }) => {
  const rng = Math.random();
  let text, goldEarned;

  if (rng < 0.05) {
    text = 'Suddenly, you are rushed by a mob of unruly kids! They steal some gold.';
    goldEarned = random(-1, -10);
  } else if (rng < 0.1) {
    text = 'You feel something odd beneath you. It\'s a pile of gold!';
    goldEarned = random(10, 20);
  } else {
    text = 'You manage to collect a couple coins.'
    goldEarned = random(1, 7);
  }

  return (
    <EventModal
      title='You sit down at the street corner and start begging...'
      image='silver_coin_stack'
      page={1}
      pages={[
        {
          text,
          options: [{
            name: 'Continue',
            goodEffect: goldEarned >= 0 && `Receive ${goldEarned} gold.`,
            badEffect: goldEarned < 0 && `Lose ${goldEarned * -1} gold.`,
            onClick: () => {
              adjustPlayerGold(goldEarned);
              closeModal();
            }
          }]
        }
      ]}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload))
});

export const BegForChange = connect(null, mapDispatchToProps)(BegForChangeComponent);
