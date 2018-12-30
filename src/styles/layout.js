export default {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  absolute: (top, right, bottom, left) => `
    position: absolute;
    ${top ? `top: ${top};` : ''}
    ${right ? `right: ${right};` : ''}
    ${bottom ? `bottom: ${bottom};` : ''}
    ${left ? `left: ${left};` : ''}
  `
};
