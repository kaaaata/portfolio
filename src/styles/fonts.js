import colors from './colors';

const ptSans = `font-family: 'PT Sans', sans-serif;`;
const ptSerif = `font-family: 'PT Serif', serif;`;

export default {
  ptSans,
  ptSerif,

  typeface: `
    ${ptSans};
    color: ${colors.white};

    h1, h2, h3, h4, h5, h6 {
      ${ptSerif}
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 25px;
    }
  `
};
