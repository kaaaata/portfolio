import React from 'react';
import { genLoot } from './utils/game';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */



const Game = () => {
  document.title = 'Game | Catherine Han';

  return (
    <section>
      {[1,2,3,4,5,6,7,8,9].map((lootLevel) => {
        const { type, slots, name, rarity, itemLevel, stats, sprite } = genLoot(lootLevel);
        const lootCss = css`
          border-bottom: 1px solid;
          padding: 10px 0;

          .loot_thumbnail {
            width: 42px;
            height: 42px;
            padding: 5px;
            background: url("assets/game/32x32/${sprite}") no-repeat center center;
            border: 1px solid;
            margin: 3px 0;
          }
        `;

        return (
          <div css={lootCss}>
            <div>{name} ({rarity})</div>
            <div className='loot_thumbnail' />
            <div>Type: {type} Level {itemLevel} ({slots.join(', ')})</div>
            <div>Stats: {JSON.stringify(stats)}</div>
          </div>
        );
      })}
    </section>
  );
};

export default Game;
