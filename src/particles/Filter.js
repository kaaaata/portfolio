import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const Filter = ({
  opacity = 0
}) => {
  const filterCss = css`
    opacity: ${opacity};
    width: 100%;
    height: 100%;
    position: absolute;
    background: white;
  `;

  return (
    <div css={filterCss} />
  );
};

export default Filter;
