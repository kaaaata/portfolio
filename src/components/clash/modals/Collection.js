import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { cards } from '../cards/cards';
import { Card } from '../Card';
import { Modal } from './Modal';
import { colors } from '../../styles';

const rarities = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3
};
const sortFunc = (a, b) => {
  const cardA = cards[a];
  const cardB = cards[b];
  if (rarities[cardA.rarity] < rarities[cardB.rarity]) {
    return -1;
  } else if (rarities[cardA.rarity] > rarities[cardB.rarity]) {
    return 1;
  } else if (cardA.name < cardB.name) {
    return -1;
  } else if (cardA.name > cardB.name) {
    return 1;
  }

  return 0;
};

const collectionCss = css`
  .text {
    font-size: 24px;
  }

  .collection_container {
    position: absolute;
    left: 50px;
    top: 60px;
    width: 320px;
    height: 420px;
    box-shadow: 0 8px 16px blue;
    overflow: scroll;
    
    .collection_card {
      width: 50%;
      display: inline-block;

      & > div {
        display: inline-block;
      }
      
      .collection_card_value {
        margin-left: 5px;
        font-size: 20px;
        text-shadow: 2px 2px 4px ${colors.black};
      }
    }
  }

  .collection {
    position: absolute;
    top: 515px;
    left: 250px;
  }

  .deck {
    position: absolute;
    top: 515px;
    left: 800px;
  }

  .arrows {
    margin-top: 100px;
    font-size: 60px;
  }

  .continue {
    margin-top: 200px;
  }
`;

const CollectionComponent = ({
  collection,
  deck,
  setPlayerProperties,
  setYourDeck,
  goToNextScene,
  playerId
}) => {
  console.log('collection', collection);
  const deckColumns = [
    deck.slice(0, 15),
    deck.slice(15)
  ];

  const moveCardToCollection = (card) => {
    const newProperties = {
      collection: { ...collection },
      deck: [...deck]
    };

    if (collection.hasOwnProperty(card)) {
      newProperties.collection[card]++;
    } else {
      newProperties.collection[card] = 1;
    }

    newProperties.deck.splice(deck.indexOf(card), 1);

    setPlayerProperties({
      id: playerId,
      properties: newProperties
    });
  };

  const moveCardToDeck = (card) => {
    if (deck.length === 30) {
      return;
    }

    const newProperties = {
      collection: { ...collection },
      deck: [...deck]
    };

    if (collection[card] >= 2) {
      newProperties.collection[card]--;
    } else {
      delete newProperties.collection[card];
    }

    newProperties.deck.push(card);

    setPlayerProperties({
      id: playerId,
      properties: newProperties
    });
  };

  const continueOnClick = () => {
    setYourDeck(deck);

    goToNextScene();
  };

  return (
    <Modal title='Edit Your Deck'>
      <div css={collectionCss}>
        <div className='collection_container'>
          {console.log('todo: make this 2 cols arrays')}
          {Object.keys(collection).sort(sortFunc).map((key, index) => (
            <div
              key={key}
              className='collection_card'
            >
              <Card name={key} onClick={() => moveCardToDeck(key)} />
              <div className='collection_card_value'>
                x{collection[key]}
              </div>
            </div>
          ))}
        </div>
        <div className='text collection'>Collection</div>
        <div className='text arrows'>⇄</div>
        {deckColumns.map((col, colIndex) => col && (
          col.map((card, cardIndex) => (
            <Card
              key={colIndex * 15 + cardIndex}
              name={card}
              x={700 + 130 * colIndex}
              y={60 + 18 * cardIndex}
              onClick={() => moveCardToCollection(card)}
            />
          ))
        ))}
        <div className='text deck'>Deck</div>
        <button className='continue' onClick={continueOnClick}>Continue</button>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.clashPlayers.playerId,
  deck: state.clashPlayers[state.clashPlayers.playerId].deck.sort(sortFunc),
  collection: state.clashPlayers[state.clashPlayers.playerId].collection
});
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload)),
  setYourDeck: payload => dispatch(actions.setYourDeck(payload))
});

export const Collection = connect(mapStateToProps, mapDispatchToProps)(CollectionComponent);
