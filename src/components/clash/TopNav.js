import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Image } from '../particles';
import { Attributes } from './Attributes';
import { Gold } from './Gold';
import { Collection } from './modals/Collection';
import { Settings } from './modals/Settings';
import { Shop } from './shop/Shop';
import { topNavCss, energyMeterCss, collectionCss } from './topNavCss';
import { Text } from './Text';
import { useSelector, shallowEqual } from 'react-redux'

export const TopNav = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { gold, energy, deck, image, stats, statBonuses, scene } = useSelector(state => ({
    gold: state.clashPlayer.gold,
    energy: state.clashTown.energy,
    deck: state.clashPlayer.deck,
    image: state.clashBattleStats.yourImage,
    stats: state.clashBattleStats.yourStats,
    statBonuses: state.clashBattleStats.yourStatBonuses,
    scene: state.clashScene.scene
  }), shallowEqual);

  return (
    <React.Fragment>
      <FlexContainer
        justifyContent='space-between'
        alignItems='center'
        _css={topNavCss}
      >
        <FlexContainer
          className='left'
          alignItems='center'
        >
          <Image
            src={`/clash/${image}.png`}
            width={20}
            height={35}
          />
          <Attributes stats={stats} statBonuses={statBonuses} />
          <Gold gold={gold} />
        </FlexContainer>

        <FlexContainer
          className='center'
          justifyContent='center'
          alignItems='center'
        >
          <Image
            src='/clash/energy.png'
            width={20}
            height={25}
            className='energy'
          />
          <div css={energyMeterCss}>
            <div className='fill' css={css`width: ${100 * energy / 12}%;`} />
            <Text type='small' className='energy_count'>{energy} / 12</Text>
          </div>
        </FlexContainer>

        <FlexContainer
          className='right'
          justifyContent='flex-end'
          alignItems='center'
        >
          <div css={collectionCss}>
            {[0, 1].map(i => (
              <Image
                key={i}
                src='/clash/card_back.png'
                width={24}
                height={34}
                onClick={() => setActiveModal(activeModal === 'collection' ? null : 'collection')}
                className={`card_${i}`}
              />
            ))}
          </div>
          <Text className='deck_count'>{deck.length}</Text>
          <Image
            src='/clash/shop.png'
            width={35}
            height={35}
            onClick={() => {
              if (scene === 'town') {
                setActiveModal(activeModal === 'shop' ? null : 'shop');
              }
            }}
            className='shop'
          >
            $
          </Image>
          <Image
            src='/clash/gear.png'
            width={35}
            height={35}
            onClick={() => setActiveModal(activeModal === 'settings' ? null : 'settings')}
            className='settings'
          />
        </FlexContainer>
      </FlexContainer>

      <div css={css`display: ${activeModal === 'collection' ? 'unset' : 'none'};`}>
        <Collection />
      </div>

      <div css={css`display: ${activeModal === 'shop' ? 'unset' : 'none'};`}>
        <Shop />
      </div>

      <div css={css`display: ${activeModal === 'settings' ? 'unset' : 'none'};`}>
        <Settings />
      </div>
    </React.Fragment>
  );
};
