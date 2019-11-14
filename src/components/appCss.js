import { css } from '@emotion/core';
import { colors, fonts, layout, mq } from './styles';

export const appCss = css`
  ${fonts.typeface}
  background: ${colors.black};
  min-width: 320px;
`;

export const appContentCss = css`
  max-width: ${layout.MAX_WIDTH}px;
  margin: auto;
  padding: ${layout.MAIN_PADDING}px;
  padding-top: ${layout.TOP_NAV_HEIGHT + layout.MAIN_PADDING}px;

  ${mq.phone(`
    padding: ${layout.MAIN_PADDING_PHONE}px;
    padding-top: ${layout.TOP_NAV_HEIGHT + layout.MAIN_PADDING_PHONE}px;
  `)}

  ${mq.phoneAndTablet(`
    display: block;
  `)}
`;
