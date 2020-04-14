import { css } from '@emotion/core';
import { colors, zIndex } from '../../../styles';

export const mapCss = css`
  margin-top: 20px;

  .map {
    display: inline-grid;
    grid-template-columns: repeat(7, 70px);
    grid-auto-rows: 70px;
    grid-gap: 5px;  

    .node {
      border: 2px solid ${colors.grey};
    }
  }

  aside {
    width: 200px;
    flex: none;

    .lightning_bolt {
      margin-top: 25px;
      margin-bottom: 5px;
      font-size: 60px;
      text-align: center;
    }

    .energy_meter {
      position: relative;
      border: 3px solid ${colors.black};
      border-radius: 5px;
      width: 80px;
      color: black;
      height: 400px;
      margin: auto;

      .fill {
        position: absolute;
        background: ${colors.green};
        width: 100%;
        bottom: 0;
        transition: height 0.5s ease-out;
      }

      .numerator, .denominator {
        font-size: 24px;
        z-index: ${zIndex.mouseEventArea1};
      }

      .fraction_line {
        transform: rotate(90deg);
        font-size: 30px;
      }
    }
  }
`;
