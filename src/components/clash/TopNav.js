import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { FlexContainer, Image } from '../particles';
import { Attributes } from './Attributes';
import { Gold } from './Gold';
import { Collection } from './modals/Collection';
import { topNavCss, energyMeterCss, collectionCss } from './topNavCss';

export const TopNavComponent = ({
  player,
  energy
}) => {
  const [activeModal, setActiveModal] = useState(null);

  let modal;
  if (activeModal === 'collection') {
    modal = <Collection />;
  } else if (activeModal === 'shop') {
    // modal = <Shop />;
  }

  return (
    <React.Fragment>
      <FlexContainer
        justifyContent='space-between'
        alignItems='center'
        _css={topNavCss}
      >
        <FlexContainer className='left'>
          {player && (
            <Image
              src={`/clash/${player.image}.png`}
              width={20}
              height={35}
            />
          )}
          {player && (
            <Attributes
              attack={player.attack}
              magic={player.magic}
              defense={player.defense}
            />
          )}
          {player && (
            <div css={collectionCss}>
              {[0, 1].map(i => (
                <Image
                  key={i}
                  src='/clash/card_back.png'
                  width={24}
                  height={34}
                  onClick={() => setActiveModal(activeModal === 'collection' ? null : 'collection')}
                />
              ))}
            </div>
          )}
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

        <FlexContainer className='right' justifyContent='flex-end'>
          {player && <Gold value={player.gold} />}
        </FlexContainer>
      </FlexContainer>

      {modal}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  player: state.clashPlayer,
  energy: state.clashMap.energy,
});

export const TopNav = connect(mapStateToProps)(TopNavComponent);
