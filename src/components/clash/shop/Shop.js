import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { CardLootModal } from '../modals/CardLootModal';
import { Spacer, Image, FlexContainer } from '../../particles';
import { rarityColors } from '../cards/rarity';
import { Gold } from '../Gold';
import { packs } from './packs';
import { genPackCards } from './genPackCards';
import { Text } from '../Text';

const genRarityColor = (string) => {
  if (string.includes('legendar')) {
    return rarityColors.legendary;
  } else if (string.includes('rare')) {
    return rarityColors.rare;
  } else if (string.includes('uncommon')) {
    return rarityColors.uncommon;
  } else {
    return rarityColors.common;
  }
};

const shopCss = css`
  .pack_container {
    display: inline-block;
    margin: 0 30px 30px 30px;

    .pack {
      transition: transform 0.1s ease-out;

      &:hover {
        transform: scale(1.25);
      }

      .gem {
        margin: auto;
      }
    }
  }
`;

export const Shop = () => {
  const { gold } = useSelector(state => ({
    gold: state.clashPlayer.gold
  }));
  const dispatch = useDispatch();

  const [activeCardLootModalPack, setActiveCardLootModalPack] = useState(null);
  const [cardLootModalCards, setCardLootModalCards] = useState([]);
  
  return (
    <React.Fragment>
      <Modal title='Shop' transparent={false}>
        <FlexContainer css={shopCss}>
          {Object.keys(packs).map(i => {
            const pack = packs[i];

            return (
              <div key={i} className='pack_container'>
                <Gold gold={pack.cost} color={gold >= pack.cost ? 'yellow' : 'red'} />
                <Spacer height={20} />
                <Image
                  key={i}
                  src='/clash/pack.png'
                  width={120}
                  height={170}
                  className='pack'
                  onClick={() => {
                    if (gold >= pack.cost) {
                      dispatch(actions.adjustPlayerGold(-1 * pack.cost));
                      setCardLootModalCards(genPackCards(pack));
                      setActiveCardLootModalPack(pack.name);
                    }
                  }}
                >
                  <Spacer height={45} />
                  <Image
                    src={`/clash/${pack.image}.png`}
                    width={75}
                    height={75}
                    className='gem'
                  />
                </Image>
                <Spacer height={30} />
                <FlexContainer alignItems='center' flexDirection='column'>
                  <Text type='small'>{pack.name}</Text>
                  <Text type='header'>&#183;</Text>
                  <Text type='small'>
                    {pack.description.map(i => (
                      <div key={i}>
                        {i[0]} <span css={css`color: ${genRarityColor(i)};`}>{i.slice(2)}</span>
                      </div>
                    ))}
                  </Text>
                </FlexContainer>
              </div>
            );
          })}
        </FlexContainer>

        <Spacer height={15} />
        <Text type='small'>
          Note: all cards have a 10% chance to upgrade to the next rarity, except for cards in the bronze pack.
        </Text>
      </Modal>

      {activeCardLootModalPack && (
        <CardLootModal
          title={activeCardLootModalPack}
          cards={cardLootModalCards}
          closeModal={() => setActiveCardLootModalPack(null)}
        />
      )}
    </React.Fragment>
  );
};
