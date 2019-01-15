import mq from './mq';

export default {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  absolute: (top, right, bottom, left) => `
    position: absolute;
    ${top || top === 0 ? `top: ${top};` : ''}
    ${right || right === 0 ? `right: ${right};` : ''}
    ${bottom || bottom === 0 ? `bottom: ${bottom};` : ''}
    ${left || left === 0 ? `left: ${left};` : ''}
  `,

  // constants
  TOP_NAV_HEIGHT: 80,
  MAIN_PADDING: 40,

  // utils

  /**
   * Convert shorthand CSS prop values to usable CSS syntax
   * @param {string} cssProperty (<css property using px value)
   * @param {number|array} dimensionsRange (<value>|[<desktopValue>, <tabletValue>, <phoneValue>])
   * @returns {string} Usable CSS syntax
   */
  genImageDimensions: (
    cssProperty, // 'width' || 'height
    dimensionsRange // <number> || [desktop, tablet, phone]
  ) => {
    if (typeof dimensionsRange === 'number') {
      return `${cssProperty}: ${dimensionsRange}px;`;
    } else if (Array.isArray(dimensionsRange) && dimensionsRange.length === 3) {
      const desktopCss = mq.desktop(`${cssProperty}: ${dimensionsRange[0]}px;`);
      const tabletCss = mq.tablet(`${cssProperty}: ${dimensionsRange[1]}px;`);
      const phoneCss = mq.phone(`${cssProperty}: ${dimensionsRange[2]}px;`);

      return `
        ${desktopCss};
        ${tabletCss};
        ${phoneCss};
      `;
    }

    return '';
  }
};
