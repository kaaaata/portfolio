import React from 'react';
import { MysteriousPotion } from './MysteriousPotion';
import { TreasureSlime } from './TreasureSlime';
import { RobberyWheel } from './RobberyWheel';
import { CaveFireball } from './CaveFireball';
import { sample } from 'lodash';

const randomEvents = [ // testing
  { name: 'Mysterious Potion', probability: 1 },
  { name: 'Treasure Slime', probability: 0 },
  { name: 'Robbery Wheel', probability: 0 },
  { name: 'Cave Fireball', probability: 0 }
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
      return <TreasureSlime rng={rng} closeModal={closeModal} />;
    case 'Robbery Wheel':
      return <RobberyWheel rng={rng} closeModal={closeModal} />;
    case 'Cave Fireball':
      return <CaveFireball rng={rng} closeModal={closeModal} />;
    default:
      return null;
  }
};
