const phoneMax = '500px';
const tabletMin = '501px';
const tabletMax = '800px';
const desktopMin = '801px';

// both css min-width and max-width values are inclusive

export default {
  phone: css => `
    @media screen and (max-width: ${phoneMax}) {
      ${css}
    }
  `,
  tablet: css => `
    @media screen and (min-width: ${tabletMin}) and (max-width: ${tabletMax}) {
      ${css}
    }
  `,
  phoneAndTablet: css => `
    @media screen and (max-width: ${tabletMax}) {
      ${css}
    }
  `,
  desktop: css => `
    @media screen and (min-width: ${desktopMin}) {
      ${css}
    }
  `,
  tabletAndDesktop: css => `
    @media screen and (min-width: ${tabletMin}) {
      ${css}
    }
  `
};
