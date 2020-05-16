import React from 'react';
import { MysteriousPotion } from './MysteriousPotion';
import { sample } from 'lodash';

const randomEvents = [
  'Mysterious Potion'
];

export const RandomEvent = ({ closeModal }) => {
  switch (sample(randomEvents)) {
    case 'Mysterious Potion':
      return <MysteriousPotion closeModal={closeModal} />;
    default:
      return null;
  }
};
