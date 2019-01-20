import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer } from './particles';
import { colors } from './styles';

const biographyCss = css`
  margin: auto;

  h3 {
    text-align: center;
  }
`;

const Biography = () => (
  <section
    id='bio'
    css={biographyCss}
  >
    <h3>CATHERINE HAN</h3>
    <Spacer height={75} />
    <h3>SOFTWARE ENGINEER</h3>
  </section>
);

export default Biography;
