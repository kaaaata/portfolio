import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Card } from './Card';
import { colors } from '../styles';
import { connect } from 'react-redux';
import * as actions from '../stores/actions';

const rarities = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3
};
const sortFunc = (a, b) => {
  if (rarities[a.rarity] < rarities[b.rarity]) {
    return -1;
  } else if (rarities[a.rarity] > rarities[b.rarity]) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }

  return 0;
};
// uses binary search to return the index in a sorted array
// at which to insert an item, given a sorting function.
const findInsertionIndex = (sortedArr, item) => {
  let low = 0;
  let mid = -1;
  let high = sortedArr.length;
  let sortScore = 0;

  while (low < high)   {
     mid = parseInt((low + high) / 2);
     sortScore = sortFunc(sortedArr[mid], item);

    if (sortScore < 0) {
      low = mid + 1;
    } else if (sortScore > 0) {
      high = mid;
    } else {
      return mid;
    }
  }

  return low;
};

const collectionCss = css`
  position: relative;

  .text {
    font-size: 24px;
    color: ${colors.black};
  }

  .title {
    text-align: center;
    margin-top: 20px;
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
    position: absolute;
    top: 240px;
    left: 600px;
    font-size: 60px;
  }

  .continue {
    position: absolute;
    top: 525px;
    left: 575px;
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
  const [cardArrays, setCardArrays] = useState({ collection, deck });

  const collectionColumns = [
    cardArrays.collection.slice(0, 15),
    cardArrays.collection.slice(15, 30),
    cardArrays.collection.slice(30, 45),
    cardArrays.collection.slice(45)
  ];
  const deckColumns = [
    cardArrays.deck.slice(0, 15),
    cardArrays.deck.slice(15)
  ];

  const cardOnClick = (card, origin, index) => {
    const destination = origin === 'deck' ? 'collection' : 'deck';
    
    if (destination === 'deck' && cardArrays.deck.length === 30) {
      return;
    }
    
    const newCardArrays = {
      deck: [...cardArrays.deck],
      collection: [...cardArrays.collection]
    };
    newCardArrays[origin].splice(index, 1);
    const insertionIndex = findInsertionIndex(cardArrays[destination], card);
    newCardArrays[destination].splice(insertionIndex, 0, card);
    setCardArrays(newCardArrays);
  };

  const continueOnClick = () => {
    setPlayerProperties({
      properties: { ...cardArrays },
      id: playerId
    });
    setYourDeck(cardArrays.deck);
    goToNextScene();
  };

  // testing: automatically continue
  goToNextScene();

  return (
    <div css={collectionCss}>
      <div className='text title'>Edit your Deck</div>
      {collectionColumns.map((col, colIndex) => col && (
        col.map((card, cardIndex) => (
          <Card
            key={colIndex * 15 + cardIndex}
            cardProps={card}
            renderProps={{ x: 40 + 130 * colIndex, y: 60 + 18 * cardIndex }}
            onClick={() => cardOnClick(card, 'collection', colIndex * 15 + cardIndex)}
          />
        ))
      ))}
      <div className='text collection'>Collection</div>
      <div className='text arrows'>⇄</div>
      {deckColumns.map((col, colIndex) => col && (
        col.map((card, cardIndex) => (
          <Card
            key={colIndex * 15 + cardIndex}
            cardProps={card}
            renderProps={{ x: 700 + 130 * colIndex, y: 60 + 18 * cardIndex }}
            onClick={() => cardOnClick(card, 'deck', colIndex * 15 + cardIndex)}
          />
        ))
      ))}
      <div className='text deck'>Deck</div>
      <button className='continue' onClick={continueOnClick}>Continue</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.clashPlayers.playerId,
  deck: state.clashPlayers[state.clashPlayers.playerId].deck.sort(sortFunc),
  collection: state.clashPlayers[state.clashPlayers.playerId].collection.sort(sortFunc)
});
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload)),
  setYourDeck: payload => dispatch(actions.setYourDeck(payload))
});

export const Collection = connect(mapStateToProps, mapDispatchToProps)(CollectionComponent);
