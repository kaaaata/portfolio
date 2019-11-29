import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, Button, FlexContainer } from '../particles';
import { trackStats } from '../utils/graphql';
import { biographyCss } from './biographyCss';

const Biography = () => (
  <section css={biographyCss}>
    <h2>Catherine Han</h2>
    <Spacer height={10} />
    <h4>Software Engineer - San Francisco, CA</h4>

    <Spacer height={120} />

    <FlexContainer justifyContent='flex-end'>
      <article>
        <h4>Feel free to contact me!</h4>
        <Spacer height={10} />
        <h4><u>catherinehan714@gmail.com</u></h4>
        <Spacer height={20} />
        <Button
          href='https://docdro.id/ySthgM0'
          onClick={() => trackStats('viewed_resume')}
        >
          <h4>View Full Resume</h4>
        </Button>
      </article>
    </FlexContainer>
  </section>
);

export default Biography;
