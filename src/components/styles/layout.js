export const layout = {
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
  `,

  // constants
  TOP_NAV_HEIGHT: 80,
  MAIN_PADDING: 40,
  MAIN_PADDING_PHONE: 20,
  MAX_WIDTH: 800
};
