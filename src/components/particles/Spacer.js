import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mq } from '../styles';

export const Spacer = ({ height }) => {
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
