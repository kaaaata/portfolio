import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { MainMenu } from './scenes/MainMenu';
import { Map } from './scenes';
import { Battle } from './Battle';
import { MasterCardList } from './MasterCardList';
import { TopNav } from './TopNav';
import { Shop } from './modals/Shop';
import { Image } from '../particles';
import { connect } from 'react-redux';

const clashCss = css`
  position: relative;
  flex-shrink: 0;
  user-select: none;
`;

const ClashComponent = ({ scene }) => {
  let sceneComponent;

  switch (scene) {
    case 'shop':
      sceneComponent = <Shop />;
      break;
    case 'battle':
      sceneComponent = <Battle />;
      break;
    case 'master_card_list':
      sceneComponent = <MasterCardList />;
      break;
    case 'map':
      sceneComponent = <Map />;
      break;
    default:
      sceneComponent = <MainMenu />;
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
      {sceneComponent}
    </Image>  
  );
};

const mapStateToProps = (state) => ({
  scene: state.clashScene.scene
});

export const Clash = connect(mapStateToProps)(ClashComponent);
