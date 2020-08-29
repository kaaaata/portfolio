import { colors } from './colors';
import { mq } from './mq';

const patrickHandSC = `font-family: 'Patrick Hand SC', cursive;`;
const raleway = `font-family: 'Raleway', sans-serif;`;

export const fonts = {
  patrickHandSC,
  raleway,

  typeface: `
    ${raleway};
    color: ${colors.white};
    text-shadow: 2px 2px 4px ${colors.black};

    h1 {
      ${patrickHandSC}
      font-size: 72px;
      letter-spacing: 6px;
      text-align: center;

      ${mq.phone(`
        font-size: 48px;
        letter-spacing: 4px;
      `)}
    }

    h2, h3, h4, h5 {
      ${raleway}
      line-height: 1.5;
    }

    h2 {
      font-size: 36px;
      letter-spacing: 1.4px;
    }

    h3 {
      font-size: 24px;
      letter-spacing: 1.1px;
    }

    h4 {
      font-size: 20px;
    }

    h5 {
      font-size: 16px;
    }

    p {
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
