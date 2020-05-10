import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Spacer, FlexContainer } from '../../particles';
import { Text } from '../Text';
import { TownActionCard } from './TownActionCard';
import { BegForChange } from './BegForChange';

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

const townActions = [
  {
    name: 'Go Exploring',
    energy: 5,
    image: 'map',
    description: 'Get a random event.'
  },
  {
    name: 'Work for Money',
    energy: 6,
    image: 'gold',
    description: 'Earn some gold.'
  },
  {
    name: 'Taunt the Enemy',
    energy: 3,
    image: 'steak',
    description: 'Taunt the enemy to make it stronger, but also yield better loot.'
  },
  {
    name: 'Gamble',
    energy: 3,
    image: 'snake_ring',
    description: 'Do you feel lucky?'
  },
  {
    name: 'Beg for Change',
    energy: 1,
    image: 'silver_coin_stack',
    description: 'A low chance to earn a little gold.'
  },
  {
    name: 'Donate to Charity',
    energy: 4,
    image: 'weapons_guy',
    description: 'Donate away cards you don\'t need.'
  },
  {
    name: 'Do Drugs',
    energy: 7,
    image: 'pink_potion',
    description: 'Gain a temporary stat boost.'
  },
  {
    name: 'Next Day',
    energy: 0,
    image: 'clash_swords',
    description: 'Continue on to the next battle.'
  }
];

const TownComponent = ({
  energy,
  setScene,
  adjustPlayerEnergy
}) => {
  const [townActionDescription, setTownActionDescription] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  let modal;

  switch (activeModal) {
    case 'Beg for Change':
      modal = <BegForChange closeModal={() => setActiveModal(null)} />;
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
            <Text>Updates go here.</Text>
            <Text>{townActionDescription}</Text>
          </FlexContainer>
          <div className='actions'>
            {townActions.map((i, index) => (
              <TownActionCard
                key={index}
                name={i.name}
                image={i.image}
                energy={i.energy}
                canAfford={energy >= i.energy}
                onMouseEnter={() => setTownActionDescription(i.description)}
                onClick={() => {
                  if (energy >= i.energy) {
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
  energy: state.clashPlayer.energy
});
const mapDispatchToProps = dispatch => ({
  setScene: payload => dispatch(actions.setScene(payload)),
  adjustPlayerEnergy: payload => dispatch(actions.adjustPlayerEnergy(payload))
});

export const Town = connect(mapStateToProps, mapDispatchToProps)(TownComponent);
