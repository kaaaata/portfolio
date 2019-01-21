import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

const Filter = ({
  opacity = 0, color = colors.white
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
