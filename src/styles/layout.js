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
  `
};
