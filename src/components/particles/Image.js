import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { omit } from 'lodash';
import { mq } from '../styles';


const Image = (props) => {
  const { src, width, height, size = 'cover', circular, className = '', _css = '' } = props;
  const otherProps = omit(props, ['src', 'width', 'height', 'size', 'circular', 'className', '_css']);

  const widthCss = mq.genResponsiveCss('width', width);
  const heightCss = mq.genResponsiveCss('height', height);

  const imageCss = css`
    background: url("assets/${src}") no-repeat center center;
    background-size: ${size};
    ${widthCss}
    ${heightCss}
    ${circular && 'border-radius: 50%;'}

    ${_css}
  `;

  return (
    <div
      className={`image ${className}`}
      css={imageCss}
      {...otherProps}
    />
  );
};

export default Image;
