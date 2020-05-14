import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { sample } from 'lodash';
import { Spacer, FlexContainer } from '../../particles';
import { Text } from '../Text';
import { TownActionCard } from './TownActionCard';
import { WorkForMoney } from './WorkForMoney';
import { ReceiveBlessing } from './ReceiveBlessing';
import { RecoverLoot } from './RecoverLoot';
import { MonsterPreview } from '../modals/MonsterPreview';
import { townActions } from './townActions';
import { monstersByTier } from '../monsters/monsters';
import { townCss } from './townCss';

export const Town = () => {
  const { energy, day, canReceiveBlessing, canRecoverLoot, canFightElite } = useSelector(state => ({
    energy: state.clashTown.energy,
    day: state.clashTown.day,
    canReceiveBlessing: state.clashTown.canReceiveBlessing,
    canRecoverLoot: state.clashTown.canRecoverLoot,
    canFightElite: state.clashTown.canFightElite
  }));
  const dispatch = useDispatch();
  
  const [townActionDescription, setTownActionDescription] = useState('');
  const [activeModal, setActiveModal] = useState(null);

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
    case 'Elite Encounter!': {
      const eliteMonster = sample(monstersByTier[Math.ceil(day / 4)]);
      eliteMonster.name = `Elite ${eliteMonster.name}`;
      eliteMonster.type = 'elite';
      eliteMonster.stats[sample('attack', 'defense', 'magic')]++;

      modal = (
        <MonsterPreview
          title='You challenge the enemy elite.'
          monsterOverride={eliteMonster}
        />
      );
      break;
    }
    case 'Work for Money':
      modal = <WorkForMoney closeModal={() => setActiveModal(null)} />;
      break;
    case 'Receive Blessing':
      modal = <ReceiveBlessing closeModal={() => setActiveModal(null)} />;
      break;
    case 'Next Day':
      modal = <MonsterPreview title={`It's the end of the ${day}${daySuffix} day.`} />;
      break;
    case 'Recover Loot':
      modal = <RecoverLoot closeModal={() => setActiveModal(null)} />;
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
            <div>
              <Text type='header'>Day: {day}/12</Text>
              <Spacer height={20} />
              {canRecoverLoot && (
                <Text type='paragraph'>
                  You were defeated! But, perhaps you can recover some loot.<br /><br />
                </Text>
              )}
              {canReceiveBlessing && (
                <Text type='paragraph'>
                  A blessing is now available!<br /><br />
                </Text>
              )}
              {canFightElite && (
                <Text type='paragraph'>
                  An elite enemy approaches!<br /><br />
                </Text>
              )}
            </div>
            <Text type='paragraph'>{townActionDescription}</Text>
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
                  (i.name === 'Receive Blessing' && !canReceiveBlessing)
                  || (i.name === 'Elite Encounter!' && !canFightElite)
                  || (i.name === 'Recover Loot' && (!canRecoverLoot))
                }
                onMouseEnter={() => setTownActionDescription(i.description) }
                onClick={() => {
                  if (energy >= i.energy) {
                    if (i.name === 'Receive Blessing') {
                      dispatch(actions.setCanReceiveBlessingFalse());
                    }
                    if (i.name === 'Elite Encounter!') {
                      dispatch(actions.setCanFightEliteFalse());
                    }
                    if (i.name === 'Recover Loot') {
                      dispatch(actions.setCanRecoverLoot(false));
                    }
                    dispatch(actions.adjustPlayerEnergy(-1 * i.energy));
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
