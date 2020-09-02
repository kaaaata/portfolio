import { css } from '@emotion/core';
import { colors, fonts, mq } from './styles';

export const appCss = css`
  ${fonts.typeface}
  background: ${colors.black};
  min-width: 320px;

  .content_container {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 0;
    height: calc(100vh - 80px);
    padding: 0 20px 40px 20px;
    overflow-y: scroll;

    & > * {
      max-width: 1200px;
      margin: auto;
      margin-bottom: 40px;
    }

    ${mq.phone(`
      height: calc(100vh - 60px);
      padding: 0 10px 40px 10px;
    `)}
  }
`;
