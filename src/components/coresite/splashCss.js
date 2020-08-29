import { css } from '@emotion/core';
import { mq, colors } from '../styles';

export const splashCss = css`
  text-align: center;
  padding-top: 150px;

  .buttons {
    a {
      margin-right: 15px;
      margin-bottom: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .underline {
    text-decoration: underline;
    color: ${colors.green};
  }

  ${mq.phone(`
    padding-top: 100px;
  `)}
`;
