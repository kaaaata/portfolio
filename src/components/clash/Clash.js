import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { MainMenu } from './scenes/MainMenu';
import { Map } from './scenes';
import { Board } from './Board';
import { MasterCardList } from './MasterCardList';
import { TopNav } from './TopNav';
import { Collection } from './modals/Collection';
import { CharSelection } from './modals/CharSelection';
import { Shop } from './modals/Shop';
import { Image } from '../particles';

const clashCss = css`
  position: relative;
  flex-shrink: 0;
  user-select: none;
`;

export const Clash = () => {
  const [scene, setScene] = useState('map');
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
    case 'map':
      sceneComponent = <Map />;
      break;
    default:
      sceneComponent = <MainMenu goToNextScene={() => setScene('map')} />;
      break;
  }

  return (
    <Image
      src='/clash/landscape.png'
      width={1000}
      height={600}
      rgbaFilter='rgba(255, 255, 255, 0.3)'
      css={clashCss}
    >
      {scene && <TopNav />}
      <button onClick={() => setScene(scene === 'map' ? null : 'map')} />
      {sceneComponent}
    </Image>  
  );
};
