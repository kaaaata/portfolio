import React from 'react';
import { MysteriousPotion } from './MysteriousPotion';
import { TreasureSlime } from './TreasureSlime';
import { sample } from 'lodash';

const randomEvents = [
  { name: 'Mysterious Potion', probability: 0 },
  { name: 'Treasure Slime', probability: 1 }
];
const randomEventPool = [];
randomEvents.forEach(event => {
  for (let i = 0; i < event.probability; i++) {
    randomEventPool.push(event.name);
  }
})

export const RandomEvent = ({ closeModal }) => {
  const rng = Math.random();

  switch (sample(randomEventPool)) {
    case 'Mysterious Potion':
      return <MysteriousPotion rng={rng} closeModal={closeModal} />;
    case 'Treasure Slime':
      return <TreasureSlime closeModal={closeModal} />;
    default:
      return null;
  }
};
