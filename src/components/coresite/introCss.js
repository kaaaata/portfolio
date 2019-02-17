import { css } from '@emotion/core';
import { zIndex, effects } from '../styles';

export const introCss = css`
  overflow: hidden;

  .image {
    ${effects.flicker}
    ${effects.rainbow}
    animation: flicker 4s ease-out infinite, rainbow 10s linear infinite;
    margin: auto;
  }
`;

export const secretCss = isSecretFound => css`
  visibility: ${isSecretFound ? 'hidden' : 'unset'};
  display: none;
  z-index: ${zIndex.mouseEventArea3};
  position: absolute;
  top: 35%;
  left: 50%;
`;
