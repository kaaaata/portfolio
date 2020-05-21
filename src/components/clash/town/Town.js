import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { sample } from 'lodash';
import { Spacer, FlexContainer } from '../../particles';
import { Text } from '../Text';
import { TownActionCard } from './TownActionCard';
import { WorkForGold } from './WorkForGold';
import { ReceiveBlessing } from './ReceiveBlessing';
import { RecoverLoot } from './RecoverLoot';
import { MonsterPreview } from '../modals/MonsterPreview';
import { DrinkPotion } from './DrinkPotion';
import { townActions } from './townActions';
import { monstersByTier } from '../monsters/monsters';
import { genEliteMonsterPrefix } from '../monsters/genEliteMonsterPrefix';
import { RandomEvent } from './randomEvents/RandomEvent';
import { townCss } from './townCss';
import { TreasureChest } from './randomEvents/TreasureChest';

export const Town = () => {
  const {
    energy,
    day,
    canReceiveBlessing,
    canRecoverLoot,
    canFightElite,
    canDrinkPotion,
    feed
  } = useSelector(state => ({
    energy: state.clashTown.energy,
    day: state.clashTown.day,
    canReceiveBlessing: state.clashTown.canReceiveBlessing,
    canRecoverLoot: state.clashTown.canRecoverLoot,
    canFightElite: state.clashTown.canFightElite,
    canDrinkPotion: state.clashTown.canDrinkPotion,
    feed: state.clashTown.feed
  }), shallowEqual);
  const dispatch = useDispatch();
  
  const [townActionDescription, setTownActionDescription] = useState('Choose an action!');
  const [activeModal, setActiveModal] = useState();

  useEffect(() => {
    if (feed.length) {
      // auto scroll feed to bottom when it updates
      const feedEl = document.querySelector('.feed');
      feedEl.scrollTop = feedEl.scrollHeight;
    }
  }, [feed.length])

  let daySuffix = 'th';
  if (day === 1) {
    daySuffix = 'st';
  } else if (day === 2) {
    daySuffix = 'nd';
  } else if (day === 3) {
    daySuffix = 'rd';
  }
  
  let modal;
  switch (activeModal) {
    case 'Elite Encounter': {
      const eliteMonster = sample(monstersByTier[Math.ceil(day / 4)]);
      eliteMonster.name = `${genEliteMonsterPrefix()} ${eliteMonster.name}`;
      eliteMonster.type = 'elite';
      eliteMonster.stats[sample('attack', 'defense', 'magic')]++;

      modal = (
        <MonsterPreview
          title='You challenge the enemy elite.'
          monsterOverride={eliteMonster}
          closeModal={() => setActiveModal(null)}
        />
      );
      break;
    }
    case 'Work for Gold':
      modal = <WorkForGold closeModal={() => setActiveModal(null)} />;
      break;
    case 'Gain Blessing':
      modal = <ReceiveBlessing closeModal={() => setActiveModal(null)} />;
      break;
    case 'Next Day':
      modal = <MonsterPreview title={`It's the end of the ${day}${daySuffix} day.`} />;
      break;
    case 'Recover Loot':
      modal = <RecoverLoot closeModal={() => setActiveModal(null)} />;
      break;
    case 'Drink Potion':
      modal = <DrinkPotion closeModal={() => setActiveModal(null)} />;
      break;
    case 'Explore':
      modal = <RandomEvent closeModal={() => setActiveModal(null)} />;
      break;
    case 'Beg for Change':
      modal = <TreasureChest
        rng={Math.random()}
        closeModal={() => setActiveModal(null)}
      />;
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <div css={townCss}>
        <Spacer height={40} />
        <Text type='header' centered>Town</Text>
        <Spacer height={40} />
        <FlexContainer>
          <FlexContainer
            className='updates'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Text type='header'>Day: {day}/12</Text>
            <Spacer height={20} />
            <div className='feed'>
              {feed.map((text, index) => (
                <React.Fragment key={index}>
                  <Text type='small' lineHeight={1.25}>{text}</Text>
                  <Spacer height={7} />
                </React.Fragment>
              ))}
            </div>
            <Spacer height={20} />
            <Text type='paragraph' className='description'>{townActionDescription}</Text>
          </FlexContainer>
          <div className='actions'>
            {townActions.map((i, index) => (
              <TownActionCard
                key={index}
                name={i.name}
                image={i.image}
                energy={i.energy}
                canAfford={energy >= i.energy}
                isDisabled={
                  (i.name === 'Gain Blessing' && !canReceiveBlessing)
                  || (i.name === 'Elite Encounter' && !canFightElite)
                  || (i.name === 'Recover Loot' && !canRecoverLoot)
                  || (i.name === 'Drink Potion' && !canDrinkPotion)
                }
                onMouseEnter={() => setTownActionDescription(i.description) }
                onClick={() => {
                  if (energy >= i.energy) {
                    if (i.name === 'Blessing') {
                      dispatch(actions.setCanReceiveBlessingFalse());
                    }
                    if (i.name === 'Elite Encounter') {
                      dispatch(actions.setCanFightEliteFalse());
                    }
                    if (i.name === 'Recover Loot') {
                      dispatch(actions.setCanRecoverLoot(false));
                    }
                    if (i.name === 'Drink Potion') {
                      dispatch(actions.setCanDrinkPotionFalse());
                    }
                    // dispatch(actions.adjustPlayerEnergy(-1 * i.energy));
                    setActiveModal(i.name);
                  }
                }}
              />
            ))}
          </div>
        </FlexContainer>
      </div>

      {modal}
    </React.Fragment>
  );
};
