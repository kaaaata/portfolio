export default {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  absolute: (top, right, bottom, left) => `
    position: absolute;
    ${top !== undefined ? `top: ${top};` : ''}
    ${right !== undefined ? `right: ${right};` : ''}
    ${bottom !== undefined ? `bottom: ${bottom};` : ''}
    ${left !== undefined ? `left: ${left};` : ''}
  `
};
