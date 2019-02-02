import { css } from '@emotion/core'; /** @jsx jsx */
import { colors, mq } from '../styles';

export const biographyCss = css`
  margin: auto;

  h2, h4 {
    text-align: center;
  }

  .bio_section {
    padding: 20px;

    &.bio_section--left {
      border-right: 1px solid ${colors.white};
    }

    &.bio_section--right {
      text-align: right;
      list-style-type: none;

      li {
        white-space: nowrap;

        span {
          color: ${colors.white};
        }
      }
    }
  }

  ${mq.phone(`
    .bio_section {
      padding: 10px;

      &.bio_section--left {
        border-right: none;
      }

      &.bio_section--right {
        width: auto;
        margin: auto;
      }
    }
  `)}

  a {
    margin: auto;
  }
`;
