import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, Button, FlexContainer, FlexItem } from './particles';
import { colors, mq } from './styles';
import { trackStats } from './utils/graphql';

const biographyCss = css`
  margin: auto;

  h2, h4 {
    text-align: center;
  }

  .bio_section {
    padding: 20px;

    &.bio_section--left {
      border-right: 1px solid ${colors.white};
    }

    &.bio_section--right {
      text-align: right;
      list-style-type: none;

      span {
        color: ${colors.white};
      }
    }
  }

  ${mq.phone(`
    .bio_section {
      padding: 10px;

      &.bio_section--left {
        border-right: none;
      }

      &.bio_section--right {
        width: auto;
        margin: auto;
      }
    }
  `)}

  a {
    margin: auto;
  }
`;

const Biography = () => (
  <FlexContainer
    id='resume'
    flexDirection='column'
    justifyContent='center'
    _css={biographyCss}
  >
    <h2>Catherine Han</h2>
    <h4>Software Engineer - San Francisco, CA</h4>
    <Spacer height={20} />

    <FlexContainer
      flexDirection={[null, null, 'column']}
      justifyContent='center'
    >
      <FlexItem className='bio_section bio_section--left'>
        <li>Experienced in building fullstack, client-facing features</li>
        <li>Especially interested in modular, scalable code patterns at the UI/UX and flux levels</li>
        <li>Up to date with modern tech and best practices</li>
        <li>Great attention to detail</li>
      </FlexItem>
      <div className='bio_section bio_section--right'>
        <li><span>Massdrop</span>&nbsp;&nbsp;&nbsp;2019</li>
        <li><span>SS&C</span>&nbsp;&nbsp;&nbsp;2017</li>
        <li><span>NYU</span>&nbsp;&nbsp;&nbsp;2016</li>
      </div>
    </FlexContainer>

    <h4>What I'm doing right now...</h4>
    <div className='bio_section'>
      <li>Work</li>
      <li>Building out features on this site</li>
      <li>Trying to get better at ping pong...</li>
    </div>

    <Spacer height={40} />
    <Button
      href='https://docdro.id/mbNvZtM'
      text='View Full Resume'
      onClick={() => trackStats('viewed_resume')}
    />
  </FlexContainer>
);

export default Biography;
