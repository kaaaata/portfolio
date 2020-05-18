import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal } from '../EventModal';
import { rarityColors } from '../../cards/rarity';
import { cardsByRarity } from '../../cards/cards';
import { random, sample } from 'lodash';
import { packs } from '../../shop/packs';
import { genPackCards } from '../../shop/genPackCards';
import { CardLootModal } from '../../modals/CardLootModal';

export const TreasureChest = ({ rng, closeModal }) => {
  const dispatch = useDispatch();

  const [isCardLootModalOpen, setIsCardLootModalOpen] = useState(false);

  let lootText;
  let lootCb;
  let lootCards = [];
  let lootPack;
  let goodText;
  
  if (rng < 0.05) {
    const gold = random(100, 150);
    lootText = <span className='yellow'>{gold} gold!</span>
    lootCb = () => {
      dispatch(actions.adjustPlayerGold(gold));
      dispatch(actions.addTownFeedText(`Received: ${gold} gold`));
    };
    goodText = `Receive ${gold} gold.`;
  } else if (rng < 0.15) {
    lootText = <span className={rarityColors.uncommon}>two uncommon cards!</span>
    lootCb = () => setIsCardLootModalOpen(true);
    lootCards = [sample(cardsByRarity.uncommon).name, sample(cardsByRarity.uncommon).name];
  } else if (rng < 0.25) {
    lootText = <span className={rarityColors.rare}>a rare card!</span>
    lootCb = () => setIsCardLootModalOpen(true);
    lootCards = [sample(cardsByRarity.rare).name];
  } else if (rng < 0.3) {
    lootText = <span className={rarityColors.legendary}>a legendary card!</span>
    lootCb = () => setIsCardLootModalOpen(true);
    lootCards = [sample(cardsByRarity.legendary).name];
  } else if (rng < 0.35) {
    lootPack = 'bronze';
  } else if (rng < 0.4) {
    lootPack = 'silver';
  } else if (rng < 0.45) {
    lootPack = 'gold';
  } else if (rng < 0.5) {
    lootPack = 'diamond';
  } else {
    const gold = random(50, 75);
    lootText = <span className='yellow'>{gold} gold!</span>
    lootCb = () => {
      dispatch(actions.adjustPlayerGold(gold));
      dispatch(actions.addTownFeedText(`Received: ${gold} gold`));
    };
    goodText = `Receive ${gold} gold.`;
  }

  if (lootPack) {
    lootText = `a ${lootPack} pack!`;
    lootCb = () => setIsCardLootModalOpen(true);
    lootCards = genPackCards(packs[lootPack]);
  }

  if (lootCards.length) {
    goodText = 'Select cards to keep.';
  }

  return isCardLootModalOpen ? (
    <CardLootModal
      title={lootPack ? packs[lootPack].name : 'Treasure Chest'}
      cards={lootCards}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title='Treasure Chest'
      image='treasure_chest'
      page={1}
      pages={[
        {
          text: (
            <React.Fragment>
              You open the chest.
              <br /><br />
              It contains {lootText}
            </React.Fragment>
          ),
          options: [{
            name: 'Continue',
            goodText,
            onClick: () => {
              lootCb();
              if (!lootCards.length) {
                closeModal();
              }
            }
          }]
        }
      ]}
    />
  );
};
