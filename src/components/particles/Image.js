import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mq } from '../styles';

export const Image = (props) => {
  const {
    src,
    width,
    height,
    size = 'cover',
    circular,
    rgbaFilter,
    external = false,
    className = '',
    _css = '',
    onClick = () => {},
    children
  } = props;

  const widthCss = mq.genResponsiveCss('width', width);
  const heightCss = mq.genResponsiveCss('height', height);
  const linearGradientCss = rgbaFilter ? `linear-gradient(${rgbaFilter}, ${rgbaFilter}), ` : '';
  const url = `${external ? '' : 'assets/'}${src}`;

  const imageCss = css`
    background: ${linearGradientCss}url("${url}") no-repeat center center;
    background-size: ${size};
    ${widthCss}
    ${heightCss}
    ${circular ? 'border-radius: 50%;' : ''}
    ${onClick ? 'cursor: pointer;' : ''}

    ${_css}
  `;

  return (
    <div
      className={`image ${className}`}
      css={imageCss}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
