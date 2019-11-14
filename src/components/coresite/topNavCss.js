import { css } from '@emotion/core';
import { colors, zIndex, layout, mq } from '../styles';

export const topNavCss = css`
  position: fixed;
  width: 100%;
  height: ${layout.TOP_NAV_HEIGHT}px;
  z-index: ${zIndex.stickyNav};
  background: ${colors.blackDark};

  .top_nav__content {
    padding: 0 ${layout.MAIN_PADDING}px;
    height: 100%;
    z-index: ${zIndex.stickyNavContent};
    
    h2 {
      margin-right: 10px;

      ${mq.phone(`
        margin-right: 5px;
      `)}
    }
  
    a {
      height: 100%;
      ${layout.flexCenter};

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
`;

export const mediaIconsCss = image => css`
  background: url("assets/${image}") no-repeat center center;
  background-size: cover;
  width: 20px;
  height: 20px;
  filter: invert(100%);
  transition: transform 0.25s ease-out;
  margin: 0 10px;

  ${mq.phone(`
    margin: 0 5px;
  `)}
`;
