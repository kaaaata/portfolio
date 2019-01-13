import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const Image = ({ src, width, height, circular }) => {
  const imageCss = css`
    background: url("assets/${src}") no-repeat center center;
    background-size: cover;
    ${width && `width: ${width}px;`}
    ${height && `height: ${height}px;`}
    ${circular && 'border-radius: 50%;'}
  `;

  return (
    <div css={imageCss} />
  );
};

export default Image;
