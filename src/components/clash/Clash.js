import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { MainMenu } from './scenes/MainMenu';
import { Map } from './scenes';
import { Battle } from './Battle';
import { TopNav } from './TopNav';
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
    case 'battle':
      sceneComponent = <Battle />;
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
