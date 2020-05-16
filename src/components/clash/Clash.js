import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { BackgroundImage } from './scenes/BackgroundImage';
import { MainMenu } from './scenes/MainMenu';
import { Story } from './scenes/Story';
import { Town } from './town/Town';
import { Battle } from './battle/Battle';
import { TopNav } from './TopNav';
import { Spacer } from '../particles';
import { useSelector, shallowEqual } from 'react-redux';
import { colors } from '../styles';

const clashCss = css`
  width: 1000px;
  height: 600px;
  position: relative;
  flex-shrink: 0;
  user-select: none;

  .scene {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .sand { color: ${colors.sand}; }
  .green { color: ${colors.green}; }
  .blue { color: ${colors.blue}; }
  .red { color: ${colors.red}; }
  .yellow { color: ${colors.yellow}; }
`;

export const Clash = () => {
  const { scene } = useSelector(state => ({
    scene: state.clashScene.scene
  }), shallowEqual);

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
    <div css={clashCss}>
      <BackgroundImage />
      <div className='scene'>
        <Spacer height={40} />
        {sceneComponent}
      </div>
      {!['story', 'main_menu'].includes(scene) && (
        <TopNav />
      )}
    </div>
  );
};
