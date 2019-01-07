const phoneMax = '500px';
const tabletMax = '800px';

export default {
  phone: css => `
    @media screen and (max-width: ${phoneMax}) {
      ${css}
    }
  `,
  tablet: css => `
    @media screen and (max-width: ${tabletMax}) {
      ${css}
    }
  `
};
