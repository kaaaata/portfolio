import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Board } from './Board';
import { MasterCardList } from './MasterCardList';
import { Collection } from './Collection';
import { CharSelection } from './modals/CharSelection';
import { Store } from './modals/Store';
import { Image, Filter } from '../particles';
import { colors, zIndex } from '../styles';

const clashCss = css`
  position: relative;
  flex-shrink: 0;
  
  .top_nav {
    position: absolute;
    z-index: ${zIndex.mouseEventArea1};
    padding-left: 200px;
    display: flex;
    align-items: center;

    .filter {
      margin-left: -200px;
    }

    button {
      height: 20px;
      width: 100px;
      z-index: ${zIndex.mouseEventArea2};
    }
  }
`;

export const Clash = () => {
  const [scene, setScene] = useState('char_selection');
  let sceneComponent;

  switch (scene) {
    case 'char_selection':
      sceneComponent = <CharSelection goToNextScene={() => setScene('store')} />;
      break;
    case 'store':
      sceneComponent = <Store goToNextScene={() => setScene('collection')} />;
      break;
    case 'collection':
      sceneComponent = <Collection goToNextScene={() => setScene('board')} />;
      break;
    case 'board':
      sceneComponent = <Board />;
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
    </Image>
  );
};
