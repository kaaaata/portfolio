import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Board } from './Board';
import { MasterCardList } from './MasterCardList';
import { TopNav } from './TopNav';
import { Collection } from './modals/Collection';
import { CharSelection } from './modals/CharSelection';
import { Shop } from './modals/Shop';
import { Image, Filter } from '../particles';
import { colors } from '../styles';

const clashCss = css`
  position: relative;
  flex-shrink: 0;
  user-select: none;
`;

export const Clash = () => {
  const [scene, setScene] = useState('char_selection');
  let sceneComponent;

  switch (scene) {
    case 'char_selection':
      sceneComponent = <CharSelection goToNextScene={() => setScene('shop')} />;
      break;
    case 'shop':
      sceneComponent = <Shop goToNextScene={() => setScene('collection')} />;
      break;
    case 'collection':
      sceneComponent = <Collection goToNextScene={() => setScene('board')} />;
      break;
    case 'board':
      sceneComponent = <Board goToNextScene={() => setScene('shop')} />;
      break;
    case 'master_card_list':
      sceneComponent = <MasterCardList />;
      break;
    default:
      break;
  }

  return (
    <Image
      src='/clash/landscape.png'
      width={1000}
      height={600}
      css={clashCss}
    >
      <Filter opacity={0.3} color={colors.white} />
      {sceneComponent}
      <TopNav />
    </Image>  
  );
};
