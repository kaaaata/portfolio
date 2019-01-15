import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { omit } from 'lodash';
import { layout } from '../styles';


const Image = (props) => {
  const { src, width, height, size = 'cover', circular } = props;
  const otherProps = omit(props, ['src', 'width', 'height', 'size', 'circular']);

  const widthCss = layout.genImageDimensions('width', width);
  const heightCss = layout.genImageDimensions('height', height);

  const imageCss = css`
    background: url("assets/${src}") no-repeat center center;
    background-size: ${size};
    ${widthCss}
    ${heightCss}
    ${circular && 'border-radius: 50%;'}
  `;

  return (
    <div
      className='image'
      css={imageCss}
      {...otherProps}
    />
  );
};

export default Image;
