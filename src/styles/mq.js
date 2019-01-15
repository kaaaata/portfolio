const phoneMax = '500px';
const tabletMax = '800px';

export default {
  phone: css => `
    @media screen and (max-width: ${phoneMax}) {
      ${css}
    }
  `,
  tablet: css => `
    @media screen and (min-width: ${phoneMax}) and (max-width: ${tabletMax}) {
      ${css}
    }
  `,
  phoneAndTablet: css => `
    @media screen and (max-width: ${tabletMax}) {
      ${css}
    }
  `,
  desktop: css => `
    @media screen and (min-width: ${tabletMax}) {
      ${css}
    }
  `,
  tabletAndDesktop: css => `
    @media screen and (min-width: ${phoneMax}) {
      ${css}
    }
  `
};
