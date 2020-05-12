import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { MainMenu } from './scenes/MainMenu';
import { Story } from './scenes/Story';
import { Town } from './town/Town';
import { Battle } from './battle/Battle';
import { TopNav } from './TopNav';
import { Image } from '../particles';
import { connect } from 'react-redux';

const rgbaFiltersByEnergy = [
  'rgba(0, 0, 0, 0.3)',
  'rgba(0, 0, 0, 0.24)',
  'rgba(0, 0, 0, 0.21)',
  'rgba(0, 0, 0, 0.18)',
  'rgba(0, 0, 0, 0.15)',
  'rgba(0, 0, 0, 0.12)',
  'rgba(0, 0, 0, 0.09)',
  'rgba(0, 0, 0, 0.06)',
  'rgba(0, 0, 0, 0.03)',
  'rgba(255, 255, 255, 0.05)',
  'rgba(255, 255, 255, 0.1)',
  'rgba(255, 255, 255, 0.15)',
  'rgba(255, 255, 255, 0.2)'
];

const clashCss = css`
  position: relative;
  flex-shrink: 0;
  user-select: none;
`;

const ClashComponent = ({ scene, energy }) => {
  let sceneComponent;

  switch (scene) {
    case 'battle':
      sceneComponent = <Battle />;
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
      rgbaFilter={rgbaFiltersByEnergy[energy]}
      css={clashCss}
    >
      {sceneComponent}
      {!['story', 'main_menu'].includes(scene) && (
        <TopNav />
      )}
    </Image>
  );
};

const mapStateToProps = (state) => ({
  scene: state.clashScene.scene,
  energy: state.clashPlayer.energy
});

export const Clash = connect(mapStateToProps)(ClashComponent);
