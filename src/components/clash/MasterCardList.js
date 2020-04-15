import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { cards } from './cards/cards';
import { Card } from './Card';

const masterCardListCss = css`
  padding: 60px;
  height: 550px;
  overflow: scroll;

  .card_container {
    display: inline-block;
    margin: 0 5px 5px 0;
  }
`;

export const MasterCardList = () => (
  <div css={masterCardListCss}>
    {Object.values(cards).map((card, index) => (
      <div key={index} className='card_container'>
        <Card name={card.name} />
      </div>
    ))}
  </div>
);
