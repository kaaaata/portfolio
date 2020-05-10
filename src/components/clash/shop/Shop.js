import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { CardPackModal } from './CardPackModal';
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

const ShopComponent = ({ gold, adjustPlayerGold }) => {
  const [isCardPackModalOpen, setIsCardPackModalOpen] = useState(false);
  const [cardPackModalCards, setCardPackModalCards] = useState([]);
  
  return (
    <React.Fragment>
      <Modal title='Shop'>
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
                      adjustPlayerGold(-1 * pack.cost);
                      setCardPackModalCards(genPackCards(pack));
                      setIsCardPackModalOpen(true);
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
                        {i[0]} <span style={{ color: genRarityColor(i) }}>{i.slice(2)}</span>
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

      {isCardPackModalOpen && (
        <CardPackModal
          cards={cardPackModalCards}
          closeModal={() => setIsCardPackModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  gold: state.clashPlayer.gold
});
const mapDispatchToProps = (dispatch) => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload))
});

export const Shop = connect(mapStateToProps, mapDispatchToProps)(ShopComponent);
