import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { genStoreCards, genPackCards } from '../cards/cards'
import { Modal } from './Modal';
import { YourPortrait } from '../Portrait';
import { Image, Spacer, FlexContainer } from '../../particles';
import { Card } from '../Card';
import { colors } from '../../styles';

const storeCss = css`
  border: 3px solid white;

  display: grid;
  grid-template-columns: 120px 120px 120px 120px;
  grid-gap: 40px;

  .card_with_price {
    &.hidden {
      visibility: hidden;
    }
  }

  .continue {
    position: absolute;
    top: 525px;
    left: 850px;
  }
`;

const priceCss = css`
  font-size: 20px;
  color: ${colors.yellow};
`;

const Gold = ({ value }) => (
  <FlexContainer justifyContent='center'>
    <Image
      src='/clash/gold.png'
      width={20}
      height={20}
    />
    <div css={priceCss}>
      {value}
    </div>
  </FlexContainer>
);

const StoreComponent = ({
  playerId,
  player,
  storeCards,
  goToNextScene,
  setPlayerProperties
}) => {
  const [cardsBoughtIndices, setCardsBoughtIndices] = useState([]);

  const continueOnClick = () => {
    setPlayerProperties({
      properties: {
        collection: [
          ...player.collection,
          ...cardsBoughtIndices.map(i => storeCards[i])
        ]
      },
      id: playerId
    });
    goToNextScene();
  };

  return (
    <Modal title='Store'>
      <div css={storeCss}>
        {storeCards.map((card, index) => (
          <div
            key={index}
            className={`card_with_price ${cardsBoughtIndices.includes(index) ? 'hidden' : ''}`}
          >
            <Card
              name={card.name}
              onClick={() => {
                console.log('bought', card);
                setCardsBoughtIndices([...cardsBoughtIndices, index]);
              }}
            />
            <Spacer height={10} />
            <Gold value={card.price} />
          </div>
        ))}
        <YourPortrait />
        <button className='continue' onClick={continueOnClick}>Continue</button>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.clashPlayers.playerId,
  player: state.clashPlayers[state.clashPlayers.playerId],
  storeCards: genStoreCards()
  // storeCards: genPackCards().map(card => ({ name: card, price: 100 }))
});
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload))
});

export const Store = connect(mapStateToProps, mapDispatchToProps)(StoreComponent);
