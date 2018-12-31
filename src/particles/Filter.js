import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const Filter = ({
  opacity = 0, color = 'white'
}) => {
  const filterCss = css`
    opacity: ${opacity};
    background: ${color};
    width: 100%;
    height: 100%;
    position: absolute;
  `;

  return (
    <div
      className='filter'
      css={filterCss}
    />
  );
};

export default Filter;
