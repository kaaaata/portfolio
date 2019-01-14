import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { omit } from 'lodash';
import { mq } from '../styles';

/**
 * Convert shorthand CSS prop values to usable CSS syntax
 * @param {string} cssProperty (width|height)
 * @param {number|array} dimensionsRange (<value>|[<desktopValue>, <tabletValue>, <phoneValue>])
 * @returns {string} Usable CSS syntax
 */
const genImageDimensions = (
  cssProperty, // 'width' || 'height
  dimensionsRange // <number> || [desktop, tablet, phone]
) => {
  if (typeof dimensionsRange === 'number') {
    return `${cssProperty}: ${dimensionsRange}px;`;
  } else if (Array.isArray(dimensionsRange) && dimensionsRange.length === 3) {
    const desktopCss = `${cssProperty}: ${dimensionsRange[0]}px;`;
    const tabletCss = mq.tablet(`${cssProperty}: ${dimensionsRange[1]}px;`);
    const phoneCss = mq.phone(`${cssProperty}: ${dimensionsRange[2]}px;`);

    return `
      ${desktopCss};
      ${tabletCss};
      ${phoneCss};
    `;
  }

  return null;
};

const Image = (props) => {
  const { src, width, height, size = 'cover', circular } = props;
  const otherProps = omit(props, ['src', 'width', 'height', 'size', 'circular']);

  const widthCss = genImageDimensions('width', width);
  const heightCss = genImageDimensions('height', height);

  const imageCss = css`
    background: url("assets/${src}") no-repeat center center;
    background-size: ${size};
    ${widthCss || ''}
    ${heightCss || ''}
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
