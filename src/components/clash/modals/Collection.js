import { shuffle } from 'lodash';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { genMatchups } from '../gameplay/genMatchups';
import { cards } from '../cards/cards';
import { Card } from '../Card';
import { Modal } from './Modal';
import { collectionCss } from './collectionCss';

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

const CollectionComponent = ({
  player,
  goToNextScene,
  playerId,
  playableCharacters,
  setPlayerProperties,
  setMatchups,
  setBattleInitialState,
  setYourDeck,
  setEnemyDeck,
  setYourHand,
  setEnemyHand
}) => {
  const { collection } = player;
  const deck = player.deck.sort(sortFunc);
  const collectionArray = Object.keys(collection).sort(sortFunc);
  const collectionColumns = [
    collectionArray.filter((card, i) => !(i % 2)),
    collectionArray.filter((card, i) => i % 2)
  ];
  const deckColumns = [
    deck.slice(0, 15),
    deck.slice(15)
  ];

  const moveCardToCollection = (card) => {
    if (deck.length <= 4) {
      return;
    }
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
    if (deck.length === 30 || !collection[card]) {
      return;
    }

    const newProperties = {
      collection: { ...collection },
      deck: [...deck]
    };

    newProperties.collection[card]--;
    newProperties.deck.push(card);

    setPlayerProperties({
      id: playerId,
      properties: newProperties
    });
  };

  const continueOnClick = () => {
    const matchups = genMatchups();
    setMatchups(matchups);
    const enemy = playableCharacters[matchups[playerId]];
    setBattleInitialState({
      yourName: player.name,
      yourImage: player.image,
      yourPermanentStats: {
        attack: player.attack,
        magic: player.magic,
        defense: player.defense
      },
      yourTemporaryStats: { attack: 0, magic: 0, defense: 0 },
      yourShields: 0,
    
      enemyName: enemy.name,
      enemyImage: enemy.image,
      enemyPermanentStats: {
        attack: enemy.attack,
        magic: enemy.magic,
        defense: enemy.defense
      },
      enemyTemporaryStats: { attack: 0, magic: 0, defense: 0 },
      enemyShields: 0,
    
      winner: null
    });
    const yourDeck = shuffle([...deck]);
    const yourHand = yourDeck.splice(yourDeck.length - 3, 3);
    const enemyDeck = shuffle([...enemy.deck]);
    const enemyHand = enemyDeck.splice(enemyDeck.length - 3, 3);
    setYourDeck(yourDeck);
    // setYourHand(yourHand);
    setYourHand(['Candy Corn', 'Brawler', 'Healing Blade']);
    setEnemyDeck(enemyDeck);
    setEnemyHand(enemyHand);

    goToNextScene();
  };

  continueOnClick();

  return (
    <Modal title='Edit Your Deck'>
      <div css={collectionCss}>
        <div className='collection_container'>
          {collectionColumns.map((col, index) => (
            <div key={index} className='collection_col'>
              {col.map((card, cardIndex) => (
                <div
                  key={card}
                  style={{
                    position: 'absolute',
                    top: `${18 * cardIndex}px`
                  }}
                  className='collection_card'
                >
                  <Card name={card} onClick={() => moveCardToDeck(card)} />
                  <div
                    className='collection_card_value'
                    style={{ opacity: !collection[card] ? 0.2 : 'unset' }}
                  >
                    x{collection[card]}
                  </div>
                </div>
              ))}
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

const mapStateToProps = (state) => {
  const playableCharacters = [1, 2, 3, 4, 5, 6, 7, 8].map(playerId => (
    state.clashPlayers[playerId]
  ));

  return {
    playableCharacters,
    playerId: state.clashPlayers.playerId,
    player: state.clashPlayers[state.clashPlayers.playerId]
  };
};
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload)),
  setMatchups: payload => dispatch(actions.setMatchups(payload)),
  setBattleInitialState: payload => dispatch(actions.setBattleInitialState(payload)),
  setYourDeck: payload => dispatch(actions.setYourDeck(payload)),
  setEnemyDeck: payload => dispatch(actions.setEnemyDeck(payload)),
  setYourHand: payload => dispatch(actions.setYourHand(payload)),
  setEnemyHand: payload => dispatch(actions.setEnemyHand(payload))
});

export const Collection = connect(mapStateToProps, mapDispatchToProps)(CollectionComponent);
