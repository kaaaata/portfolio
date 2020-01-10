import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Board } from './Board';
import { MasterCardList } from './MasterCardList';
import { CharSelection } from './modals/CharSelection';
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
  // const [scene, setScene] = useState('master_card_list');
  // const [scene, setScene] = useState('board');
  const [scene, setScene] = useState('char_selection');
  let sceneComponent;

  switch (scene) {
    case 'board':
      sceneComponent = <Board />;
      break;
    case 'master_card_list':
      sceneComponent = <MasterCardList />;
      break;
    case 'char_selection':
      sceneComponent = <CharSelection />;
      break;
    default:
      break;
  }

  const topNav = (
    <Image
      className='top_nav'
      width='100%'
      height={40}
      src='/clash/rock.png'
    >
      <Filter opacity={0.5} color={colors.black} />
      <button type='button' onClick={() => setScene('board')}>Board</button>
      <button type='button' onClick={() => setScene('masterCardList')}>All Cards</button>
    </Image>
  );

  return (
    <Image
      src='/clash/landscape.png'
      width={1000}
      height={600}
      css={clashCss}
    >
      <Filter opacity={0.3} color={colors.white} />
      {topNav}
      {sceneComponent}
    </Image>
  );
};
