import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../../styles';

export const collectionCss = css`
  .text {
    font-size: 24px;
  }

  .collection_container {
    position: absolute;
    left: 50px;
    top: 60px;
    width: 320px;
    height: 420px;
    box-shadow: 0 8px 16px blue;
    overflow: scroll;

    .collection_col {
      width: 50%;
      position: relative;
      display: inline-block;
      
      .collection_card {
        .card {
          display: inline-block;
        }

        .collection_card_value {
          display: inline-block;
          vertical-align: top;
          margin-left: 5px;
          font-size: 20px;
          text-shadow: 2px 2px 4px ${colors.black};
        }
      }
    }
  }

  .collection {
    position: absolute;
    top: 515px;
    left: 160px;
  }

  .deck {
    position: absolute;
    top: 515px;
    left: 800px;
  }

  .arrows {
    margin-top: 100px;
    font-size: 60px;
  }

  .continue {
    margin-top: 200px;
  }
`;
