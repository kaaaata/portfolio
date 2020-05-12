import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Spacer, FlexContainer } from '../../particles';
import { Text } from '../Text';
import { TownActionCard } from './TownActionCard';
import { BegForChange } from './BegForChange';
import { WorkForMoney } from './WorkForMoney';
import { ReceiveBlessing } from './ReceiveBlessing';
import { RecoverLoot } from './RecoverLoot';
import { MonsterPreview } from '../modals/MonsterPreview';
import { townActions } from './townActions';

const townCss = css`
  padding: 0 60px;

  .play {
    position: absolute;
    left: 100px;
    top: 350px;
  }

  .title {
    margin-top: 90px;
    text-align: center;
  }

  .updates {
    width: 30%;
    padding-right: 30px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
`;

const TownComponent = ({
  energy,
  day,
  canRecoverLoot,
  adjustPlayerEnergy
}) => {
  const [townActionDescription, setTownActionDescription] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [canReceiveBlessing, setCanReceiveBlessing] = useState(day % 4 === 0);
  const [didRecoverLoot, setDidRecoverLoot] = useState(false);
  let modal;

  switch (activeModal) {
    case 'Beg for Change':
      modal = <BegForChange closeModal={() => setActiveModal(null)} />;
      break;
    case 'Work for Money':
      modal = <WorkForMoney closeModal={() => setActiveModal(null)} />;
      break;
    case 'Receive Blessing':
      modal = <ReceiveBlessing closeModal={() => setActiveModal(null)} />;
      break;
    case 'Next Day':
      modal = <MonsterPreview />;
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
              {canReceiveBlessing && (
                <Text type='paragraph'>
                  Every 4 days, you receive a blessing!<br /><br />
                </Text>
              )}
              {canRecoverLoot && (
                <Text type='paragraph'>
                  You were defeated, but perhaps you can recover some loot.<br /><br />
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
                  || (i.name === 'Recover Loot' && (!canRecoverLoot || didRecoverLoot))
                }
                onMouseEnter={() => setTownActionDescription(i.description) }
                onClick={() => {
                  if (energy >= i.energy) {
                    if (i.name === 'Receive Blessing') {
                      setCanReceiveBlessing(false);
                    }
                    if (i.name === 'Recover Loot') {
                      setDidRecoverLoot(true);
                    }
                    adjustPlayerEnergy(-1 * i.energy);
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

const mapStateToProps = (state) => ({
  energy: state.clashPlayer.energy,
  day: state.clashPlayer.day,
  canRecoverLoot: state.clashPlayer.day > 1
    && !!state.clashBattleStats.winner
    && state.clashPlayer.name !== state.clashBattleStats.winner
});
const mapDispatchToProps = dispatch => ({
  adjustPlayerEnergy: payload => dispatch(actions.adjustPlayerEnergy(payload))
});

export const Town = connect(mapStateToProps, mapDispatchToProps)(TownComponent);
