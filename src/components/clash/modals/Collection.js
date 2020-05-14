import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import { cards } from '../cards/cards';
import { Card } from '../Card';
import { Modal } from './Modal';
import { rarityScore } from '../cards/rarity';

const sortFunc = (a, b) => {
  const cardA = cards[a];
  const cardB = cards[b];
  if (rarityScore[cardA.rarity] > rarityScore[cardB.rarity]) {
    return -1;
  } else if (rarityScore[cardA.rarity] < rarityScore[cardB.rarity]) {
    return 1;
  } else if (cardA.name < cardB.name) {
    return -1;
  } else if (cardA.name > cardB.name) {
    return 1;
  }

  return 0;
};

const collectionCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  height: 425px;
  overflow: scroll;
`;

export const Collection = () => {
  const { deck } = useSelector(state => ({
    deck: state.clashPlayer.deck
  }), shallowEqual);

  return (
    <Modal title={`Your Cards (${deck.length})`}>
      <div css={collectionCss}>
        {deck.sort(sortFunc).map((card, index) => (
          <Card key={index} name={card} />
        ))}
      </div>
    </Modal>
  );
};
