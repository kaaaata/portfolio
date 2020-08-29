import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, Button, FlexContainer, CuteHR, Link } from '../particles';
import { trackStats } from '../utils/graphql';
import { splashCss } from './splashCss';

export const Splash = () => (
  <FlexContainer
    _css={splashCss}
    flexDirection='column'
    justifyContent='center'
    alignItems='center'
  >
    <h1>CATHERINE HAN</h1>
    <br />
    <h3>Software Engineer, California Bay Area</h3>
    <CuteHR />
    <h5>
      Rock Climber<br />
      Table Tennis Player<br />
      Frozen Meal Connoisseur<br />
      PC Gamer<br />
      Minor Audiophile<br />
      Chronically In Search Of A Good Apartment
    </h5>

    <Spacer height={40} />

    <FlexContainer justifyContent='center' className='buttons'>
      <Button
        href='https://docdro.id/E7U8O0c'
        onClick={() => trackStats('viewed_resume')}
      >
        <h3>RESUME</h3>
      </Button>

      <Button href='/projects'>
        <h3>PROJECTS</h3>
      </Button>
    </FlexContainer>

    <Spacer height={40} />

    <h5>
      Feel free to leave a message inside this <Link href='/copypaster'><span className='underline'>text box</span></Link>!
    </h5>
  </FlexContainer>
);
