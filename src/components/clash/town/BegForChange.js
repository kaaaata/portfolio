import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { random } from 'lodash';
import { Gold } from '../Gold';
import { Text } from '../Text';
import { Spacer } from '../../particles';

const BegForChangeComponent = ({ adjustPlayerGold, closeModal }) => {
  const rng = Math.random();
  let text, goldEarned;

  if (rng < 0.05) {
    text = 'Suddenly, you are rushed by a mob of unruly kids! They steal some gold.';
    goldEarned = random(0, -10);
  } else if (rng < 0.1) {
    text = 'You feel something odd beneath you. It\'s a pile of gold!';
    goldEarned = random(10, 20);
  } else if (rng < 0.3) {
    text = 'An hour goes by, but no one even notices.';
    goldEarned = 0;
  } else {
    text = 'You manage to collect a couple coins.'
    goldEarned = random(1, 5);
  }

  return (
    <Modal
      halfModal
      title='You sit down at the street corner and start begging...'
      continueOptions={[
        {
          text: 'Continue',
          onClick: () => {
            adjustPlayerGold(goldEarned);
            closeModal();
          }
        }
      ]}
    >
      <Text>{text}</Text>
      <Spacer height={40} />
      <Gold gold={goldEarned} big />
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload))
});

export const BegForChange = connect(null, mapDispatchToProps)(BegForChangeComponent);
