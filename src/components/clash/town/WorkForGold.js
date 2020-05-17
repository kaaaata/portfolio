import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { random } from 'lodash';
import { EventModal } from './EventModal';
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
  'weaving some baskets.',
  'selling some fish.',
  'herding some sheep.'
];

export const WorkForGold = ({ closeModal }) => {
  const dispatch = useDispatch();

  const goldEarned = random(5, 15);

  return (
    <EventModal
      title='You search for a job, and wind up...'
      image='gold'
      page={1}
      pages={[
        {
          text: `...${sample(flavorTexts)}`,
          options: [{
            name: 'Continue',
            goodText: goldEarned >= 0 && `Receive ${goldEarned} gold.`,
            onClick: () => {
              dispatch(actions.adjustPlayerGold(goldEarned));
              dispatch(actions.addTownFeedText(`Received: ${goldEarned} gold`));
              closeModal();
            }
          }]
        }
      ]}
    />
  );
};
