import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { random } from 'lodash';
import { Gold } from '../Gold';
import { Text } from '../Text';
import { Spacer } from '../../particles';
import { sample } from 'lodash';

const flavorTexts = [
  'cleaning the pig pen.',
  'patching up a few houses.',
  'cleaning the sewers.',
  'fixing a couple fences.',
  'selling some cookies.',
  'delivering some parcels.',
  'sweeping the streets.',
  'beating up some hoodlums.',
  'weaving some baskets.'
];

const WorkForMoneyComponent = ({ adjustPlayerGold, closeModal }) => {
  console.log('work for money rerendered');
  const goldEarned = random(20, 40);
  adjustPlayerGold(goldEarned);

  return (
    <Modal
      halfModal
      title='You search for a job, and wind up...'
      continueOptions={[
        {
          text: 'Continue',
          onClick: () => closeModal()
        }
      ]}
    >
      <Text>...{sample(flavorTexts)}</Text>
      <Spacer height={40} />
      <Gold gold={goldEarned} big />
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload))
});

export const WorkForMoney = connect(null, mapDispatchToProps)(WorkForMoneyComponent);
