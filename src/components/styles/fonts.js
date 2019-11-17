import colors from './colors';
import mq from './mq';

const ptSans = `font-family: 'PT Sans', sans-serif;`;
const ptSerif = `font-family: 'PT Serif', serif;`;

export default {
  ptSans,
  ptSerif,

  typeface: `
    ${ptSans};
    color: ${colors.white};

    h1, h2, h3, h4, h5, h6 {
      ${ptSans}
    }

    h1 {
      font-size: 30px;
      margin-bottom: 20px;
      line-height: 1.25;
    }

    h2 {
      font-size: 25px;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    h4 {
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 10px;
      line-height: 1.5;
      color: ${colors.grey};
    }

    li {
      line-height: 1.5;
      color: ${colors.grey};

      ${mq.phoneAndTablet(`
        line-height: 1.25;
      `)}
    }
  `
};
