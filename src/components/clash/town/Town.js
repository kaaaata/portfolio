import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Spacer, Image, FlexContainer } from '../../particles';
import { Text } from '../Text';

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

const townActionCardCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: transform 0.1s ease-out;

  &:hover {
    transform: scale(1.25);
  }

  .energy {
    margin-left: 3px;
  }
`;

const TownActionCard = ({
  townAction,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  return (
    <Image
      src='/clash/frame.png'
      width={150}
      height={200}
      rgbaFilter='rgba(0, 0, 0, 0.3)'
      css={townActionCardCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={`/clash/${townAction.image}.png`}
        width={100}
        height={100}
        size='contain'
      />
      <Spacer height={5} />
      <Text type='small'>{townAction.name}</Text>
      <Spacer height={10} />
      <FlexContainer justifyContent='center' alignItems='center'>
        <Text type='header' color='yellow'>{townAction.energy}</Text>
        <Image
          src='/clash/energy.png'
          width={35}
          height={40}
          className='energy'
        />
      </FlexContainer>
    </Image>
  );
};

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

  return (
    <div css={townCss}>
      <Spacer height={40} />
      <Text type='header' centered>
        Town
      </Text>
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
              townAction={i}
              onMouseEnter={() => setTownActionDescription(i.description)}
              onMouseLeave={() => setTownActionDescription('')}
              onClick={() => {
                if (energy >= i.energy) {
                  adjustPlayerEnergy(-1 * i.energy);
                }
              }}
            />
          ))}
        </div>
      </FlexContainer>
    </div>
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
