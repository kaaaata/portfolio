import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

const cuteHRCss = css`
  height: 4px;
  box-shadow: 2px 2px 4px ${colors.black};
  width: 150px;
  margin: 25px 0;
  background: ${colors.white};
  border-radius: 20px;
`;

export const CuteHR = () => (
  <hr css={cuteHRCss} />
);
