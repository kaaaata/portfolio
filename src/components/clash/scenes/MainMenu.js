import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const mainMenuCss = css`
  h1 {
    font-size: 36px;
    cursor: pointer;
    position: absolute;
    left: 100px;
    top: 350px;
  }
`;

export const MainMenu = ({ goToNextScene }) => (
  <div css={mainMenuCss}>
    <h1 onClick={() => goToNextScene()}>Play</h1>
  </div>
);
