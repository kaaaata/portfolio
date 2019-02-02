import { css } from '@emotion/core';
import { colors, layout, zIndex } from '../styles';

export const sidebarCss = isSidebarVisible => css`
  width: ${isSidebarVisible ? '250px' : 0};
  background: ${colors.blackMediumDark};
  height: 100%;
  box-shadow: 0 5px 15px ${colors.blackDark};
  position: fixed;
  z-index: ${zIndex.stickyNav};
  top: ${layout.TOP_NAV_HEIGHT}px;
  left: 0;
  overflow: hidden;
  transition: width 0.25s ease-out;
`;

export const sidebarLinksCss = isSidebarVisible => css`
  white-space: nowrap;
  height: 40px;
  background: ${isSidebarVisible ? colors.green : colors.blackMediumDark};
  transition: background 0.75s ease-out;
  ${layout.flexCenter}

  .filter {
    height: 40px;
    z-index: ${zIndex.stickyNavFilter};
  }

  .sidebar_link--text {
    position: relative;
    z-index: ${zIndex.stickyNavContent};
  }
`;
