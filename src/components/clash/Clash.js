import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { MainMenu } from './scenes/MainMenu';
import { Story } from './scenes/Story';
import { Map } from './scenes';
import { Town } from './town/Town';
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
    case 'story':
      sceneComponent = <Story />;
      break;
    case 'main_menu':
      sceneComponent = <MainMenu />;
      break;
    case 'town':
      sceneComponent = <Town />;
      break
    default:
      sceneComponent = null;
      break;
  }

  return (
    <Image
      src='/clash/landscape.png'
      width={1000}
      height={600}
      rgbaFilter='rgba(255, 255, 255, 0.2)'
      css={clashCss}
    >
      {!['story', 'main_menu'].includes(scene) && (
        <TopNav />
      )}
      {sceneComponent}
    </Image>  
  );
};

const mapStateToProps = (state) => ({
  scene: state.clashScene.scene
});

export const Clash = connect(mapStateToProps)(ClashComponent);
