import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { FlexContainer, Image } from '../particles';
import { Attributes } from './Attributes';
import { Gold } from './Gold';
import { Collection } from './modals/Collection';
import { Shop } from './shop/Shop';
import { topNavCss, energyMeterCss, collectionCss } from './topNavCss';

export const TopNavComponent = ({
  player,
  energy
}) => {
  const [activeModal, setActiveModal] = useState(null);

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
            src={`/clash/${player.image}.png`}
            width={20}
            height={35}
          />
          <Attributes
            attack={player.attack}
            magic={player.magic}
            defense={player.defense}
          />
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
          <div className='deck_count'>{player.deck.length}</div>
        </FlexContainer>

        <FlexContainer
          className='center'
          justifyContent='center'
          alignItems='center'
        >
          <Image
            src='/clash/energy.png'
            width={30}
            height={30}
            className='energy'
          />
          <div css={energyMeterCss}>
            <div className='fill' style={{ width: `${energy}%` }} />
            <div className='energy_count'>{energy} / 100</div>
          </div>
        </FlexContainer>

        <FlexContainer
          className='right'
          justifyContent='flex-start'
          alignItems='center'
        >
          <Image
            src='/clash/shop.png'
            width={30}
            height={30}
            onClick={() => setActiveModal(activeModal === 'shop' ? null : 'shop')}
            className='shop'
          >
            $
          </Image>
          <Gold gold={player.gold} />
        </FlexContainer>
      </FlexContainer>

      <div style={{ display: activeModal === 'collection' ? 'unset' : 'none' }}>
        <Collection />
      </div>

      <div style={{ display: activeModal === 'shop' ? 'unset' : 'none' }}>
        <Shop />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  player: state.clashPlayer,
  energy: state.clashMap.energy,
});

export const TopNav = connect(mapStateToProps)(TopNavComponent);
