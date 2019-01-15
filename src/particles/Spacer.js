import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { layout } from '../styles';

const Spacer = ({ height }) => {
  const heightCss = layout.genImageDimensions('height', height);

  return (
    <div
      css={css`
        width: 100%;
        ${heightCss};
      `}
    />
  );
};

export default Spacer;
