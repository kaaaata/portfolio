import { css } from '@emotion/core'; /** @jsx jsx */

export const townCss = css`
  padding: 0 60px;

  .play {
    position: absolute;
    left: 100px;
    top: 350px;
  }

  .title {
    margin-top: 90px;
    text-align: center;
  }

  .updates {
    width: 30%;
    padding-right: 30px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
`;
