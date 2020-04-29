import { css } from '@emotion/core';
import { colors } from '../../../styles';

export const mapCss = css`
  padding-top: 20px;

  .map {
    display: inline-grid;
    grid-template-columns: repeat(7, 70px);
    grid-auto-rows: 70px;
    grid-gap: 1px;

    .node {
      border: 2px solid ${colors.grey};

      &.player_node {
        border-color: ${colors.yellowLight};
      }

      &.blank_node {
        background: transparent;
      }

      .checkmark {
        color: ${colors.green};
        font-size: 48px;
        text-align: right;
        text-shadow: 2px 2px 3px ${colors.black};
      }
    }
  }
`;
