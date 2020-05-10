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
  setScene,
  adjustPlayerEnergy
}) => {
  const [townActionDescription, setTownActionDescription] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [canReceiveBlessing, setCanReceiveBlessing] = useState(day % 4 === 0);
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
                <Text type='paragraph'>Every 4 days, you receive a blessing!</Text>
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
                isDisabled={i.name === 'Receive Blessing' && !canReceiveBlessing}
                onMouseEnter={() => setTownActionDescription(i.description) }
                onClick={() => {
                  if (energy >= i.energy) {
                    if (i.name === 'Receive Blessing') {
                      setCanReceiveBlessing(false);
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
  day: state.clashPlayer.day
});
const mapDispatchToProps = dispatch => ({
  setScene: payload => dispatch(actions.setScene(payload)),
  adjustPlayerEnergy: payload => dispatch(actions.adjustPlayerEnergy(payload))
});

export const Town = connect(mapStateToProps, mapDispatchToProps)(TownComponent);
