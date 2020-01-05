import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

export const cardBodyCss = css`
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-shadow: 2px 2px 4px ${colors.black};

  .name {
    text-align: center;
    padding: 5px;
  }

  .image_container {
    display: flex;
    justify-content: center;
    position: relative;
    padding: 5px;
    
    .filter {
      margin-top: -5px;
    }

    .attack, .defense {
      font-size: 24px;
      position: absolute;
      left: 5px;
      top: 5px;
      text-align: center;

      .number {
        margin-top: 8px;
        margin-left: -4px;
      }

      &.defense {
        left: unset;
        right: 5px;

        .number {
          margin-left: 0;
        }
      }
    }
  }

  .border {
    height: 2px;
    background: ${colors.grey};
  }

  .description {
    font-size: 10px;
    padding: 5px;
  }
`;
