import { css } from '@emotion/core';
import { zIndex, mq } from '../styles';

export const topNavCss = css`
  position: fixed;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: ${zIndex.stickyNav};
  background: transparent;

  .content {
    padding: 0 20px;
    height: 100%;
    z-index: ${zIndex.stickyNavContent};
  
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      .filter {
        z-index: ${zIndex.stickyNavFilter};
      }

      &:hover {
        div {
          transform: scale(1.2);
        }
      }
    }
  }

  ${mq.phone(`
    height: 60px;

    .content {
      padding: 0 10px;
    }
  `)}
`;

export const mediaIconsCss = image => css`
  background: url("assets/${image}") no-repeat center center;
  background-size: cover;
  width: 20px;
  height: 20px;
  filter: invert(100%);
  transition: transform 0.25s ease-out;
  margin: 0 15px;

  ${mq.phone(`
    margin: 0 10px;
  `)}
`;
