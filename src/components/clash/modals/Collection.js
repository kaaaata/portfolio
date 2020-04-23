import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { cards } from '../cards/cards';
import { Card } from '../Card';
import { Modal } from './Modal';
import { FlexContainer } from '../../particles';

const rarities = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3
};
const sortFunc = (a, b) => {
  const cardA = cards[a];
  const cardB = cards[b];
  if (rarities[cardA.rarity] > rarities[cardB.rarity]) {
    return -1;
  } else if (rarities[cardA.rarity] < rarities[cardB.rarity]) {
    return 1;
  } else if (cardA.name < cardB.name) {
    return -1;
  } else if (cardA.name > cardB.name) {
    return 1;
  }

  return 0;
};

const collectionCss = css`
  width: 1000px;
  height: 425px;
  overflow: scroll;

  .card {
    margin: 5px;
  }

  .card_container {
    display: inline-block;
    margin: 0 10px 1px 0;
  }
`;


const CollectionComponent = ({
  deck,
  closeModal
}) => (
  <Modal title='Your Deck'>
    <FlexContainer
      justifyContent='center'
      flexWrap='wrap'
      _css={collectionCss}
    >
      {deck.sort(sortFunc).map((card, index) => (
        <Card key={index} name={card} />
      ))}
    </FlexContainer>
  </Modal>
);

const mapStateToProps = (state) => ({
  deck: state.clashPlayer.deck
});

export const Collection = connect(mapStateToProps)(CollectionComponent);
