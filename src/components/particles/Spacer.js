import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mq } from '../styles';

const Spacer = ({ height }) => {
  const heightCss = mq.genResponsiveCss('height', height);

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
