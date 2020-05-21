import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { BackgroundImage } from './scenes/BackgroundImage';
import { Scene } from './scenes/Scene';
import { TopNav } from './TopNav';
import { Toasts } from './Toasts';
import { colors } from '../styles';

const clashCss = css`
  width: 1000px;
  height: 600px;
  position: relative;
  flex-shrink: 0;
  user-select: none;

  .sand { color: ${colors.sand}; }
  .green { color: ${colors.green}; }
  .blue { color: ${colors.blue}; }
  .red { color: ${colors.red}; }
  .yellow { color: ${colors.yellow}; }
  .violet { color: ${colors.violet}; }
`;

export const Clash = () => (
  <div css={clashCss}>
    <BackgroundImage />
    <Scene />
    <TopNav />
    <Toasts />
  </div>
);
