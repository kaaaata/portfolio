const montserrat = `font-family: 'Montserrat', sans-serif;`;
const karla = `font-family: 'Karla', sans-serif;`;

export default {
  karla,
  montserrat,

  typeface: `
    ${montserrat}

    color: white;

    p {
      line-height: 1.5;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
      line-height: 1;
    }

    h2 {
      font-size: 20px;
      line-height: 1.5;
    }

    h3 {
      font-size: 16px;
      line-height: 1.5;
    }
  `
};
