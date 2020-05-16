import { css } from '@emotion/core'; /** @jsx jsx */
import { mixins } from './mixins';

export const effects = {
  flicker: `
    ${mixins.keyframes('flicker', `
      0% { opacity: 0.8; }
      20% { opacity: 0.8; }
      23% { opacity: 0.45; }
      27% { opacity: 0.45; }
      33% { opacity: 0.8; }
      40% { opacity: 0.8; }
      44% { opacity: 0.7; }
      54% { opacity: 0.7; }
      57% { opacity: 0.75; }
      59% { opacity: 0.8; }
      65% { opacity: 0.8; }
      69% { opacity: 0.7; }
      74% { opacity: 0.8; }
    `)}
  `,
  rainbow: `
    ${mixins.keyframes('rainbow', `
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    `)}
  `,
  fadeInWithDelay: (delay = 0) => css`
    ${mixins.keyframes('fade', `
      0% { opacity: 0; }
      ${delay ? `${Math.floor(100 / (delay + 1) * delay)}% { opacity: 0; }` : ''}
      100% { opacity: 1; }
    `)}
    animation: fade ${1 + delay}s ease-out;
  `
};
