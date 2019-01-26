const phoneMax = '500px';
const tabletMin = '501px';
const tabletMax = '800px';
const desktopMin = '801px';

// both css min-width and max-width values are inclusive
const phone = css => `
  @media screen and (max-width: ${phoneMax}) {
    ${css}
  }
`;
const tablet = css => `
  @media screen and (min-width: ${tabletMin}) and (max-width: ${tabletMax}) {
    ${css}
  }
`;
const phoneAndTablet = css => `
  @media screen and (max-width: ${tabletMax}) {
    ${css}
  }
`;
const desktop = css => `
  @media screen and (min-width: ${desktopMin}) {
    ${css}
  }
`;
const tabletAndDesktop = css => `
  @media screen and (min-width: ${tabletMin}) {
    ${css}
  }
`;

export default {
  phone,
  tablet,
  phoneAndTablet,
  desktop,
  tabletAndDesktop,

  /**
   * Convert shorthand CSS prop values to usable emotion CSS syntax
   * @param {string} cssProperty css property name
   * @param {string|number|array} cssValue (<value>|[<desktopValue>, <tabletValue>, <phoneValue>])
   * gracefully handles all cssValue shapes [], [a, b], [a, null, b], [a, 0, b], ['', a, b]
   * @param {boolean} forcePixels forces cssValue numbers to use "px". default true.
   * @returns {string} Usable emotion CSS syntax
   */
  genResponsiveCss: (cssProperty, cssValue, forcePixels = true) => {
    const isCssPropertyValid = typeof cssProperty === 'string' && cssProperty !== '';
    if (!isCssPropertyValid) return '';

    const isCssValueValidSingular = value => (
      (typeof value === 'string' && value !== '') || typeof value === 'number'
    );

    if (isCssValueValidSingular(cssValue)) {
      const value = forcePixels
        ? typeof cssValue === 'number' ? `${cssValue}px` : cssValue
        : cssValue;
      return `${cssProperty}: ${value};`;
    }

    if (Array.isArray(cssValue) && cssValue.length >= 1) {
      const values = forcePixels
        ? cssValue.map(value => (typeof value === 'number' ? `${value}px` : value))
        : cssValue;

      const desktopCss = isCssValueValidSingular
        ? desktop(`${cssProperty}: ${values[0]};`)
        : '';
      const tabletCss = isCssValueValidSingular(values[1])
        ? tablet(`${cssProperty}: ${values[1]};`)
        : desktopCss;
      const phoneCss = isCssValueValidSingular(values[2])
        ? phone(`${cssProperty}: ${values[2]};`)
        : tabletCss;

      return `
        ${desktopCss}
        ${tabletCss}
        ${phoneCss}
      `;
    }

    return '';
  }
};
