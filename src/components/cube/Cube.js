import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Algorithms } from './Algorithms';
import { Spacer } from '../particles';

export const Cube = () => (
  <section>
    <h1>Cat's Cubing Page</h1>
    <Spacer height={20} /><hr /><Spacer height={20} />
    <Algorithms />
  </section>
);
