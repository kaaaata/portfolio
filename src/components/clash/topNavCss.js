import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

export const topNavCss = css`
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 20px;
  width: 100%;
  box-shadow: 2px 2px 4px ${colors.black};

  .left, .right {
    width: 250px;
  }

  .attributes {
    margin-left: 20px;
    margin-right: 20px;
    width: 110px;
    font-size: 24px;
  }

  .shop {
    margin-left: 20px;
    transition: transform 0.1s ease-out;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    color: ${colors.yellow};

    &:hover {
      transform: scale(1.25);
    }
  }

  .deck_count {
    line-height: 40px;
    margin-left: 3px;
    font-size: 24px;
  }
`;

export const energyMeterCss = css`
  position: relative;
  width: 400px;
  height: 24px;
  border: 2px solid ${colors.yellowLight};
  border-radius: 3px;
  margin-left: 3px;

  .fill {
    background: ${colors.yellowLight};
    width: 100%;
    height: 100%;
    transition: width 1s ease-out;
  }

  .energy_count {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${colors.white};
    text-shadow: 1px 1px 2px black;
    font-size: 16px;
  }
`;

export const collectionCss = css`
  position: relative;
  margin-left: 10px;
  transition: transform 0.1s ease-out;
  cursor: pointer;
  width: 53px;
  height: 40px;
  
  &:hover {
    transform: scale(1.2);
  }

  .image {
    border: 1px solid ${colors.steel};
    border-radius: 2px;

    &.card_0 {
      position: absolute;
      left: 9px;
      top: 4px;
      transform: rotate(-35deg);
    }

    &.card_1 {
      position: absolute;
      left: 22px;
      top: 3px;
      transform: rotate(25deg);
    }
  }
`;
