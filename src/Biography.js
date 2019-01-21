import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, Button } from './particles';
import { colors } from './styles';

const biographyCss = css`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2, h4 {
    text-align: center;
  }
  
  .bio_container {
    display: flex;
    justify-content: center;

    .bio--left {
      flex-grow: 1;
      padding: 20px;
      border-right: 1px solid ${colors.white};
    }

    .bio--right {
      padding: 20px;
      text-align: right;
      list-style-type: none;

      span {
        color: ${colors.white};
      }
    }
  }

  .bio--right_now {
    padding: 20px;
  }

  a {
    margin: auto;
  }
`;

const Biography = () => (
  <section
    id='bio'
    css={biographyCss}
  >
    <h2>Catherine Han</h2>
    <h4>Software Engineer - San Francisco, CA</h4>
    <Spacer height={20} />

    <div className='bio_container'>
      <div className='bio--left'>
        <li>Experienced in building fullstack, client-facing features</li>
        <li>Especially interested in modular, scalable code patterns at the UI/UX and flux levels</li>
        <li>Up to date with modern tech and best practices</li>
        <li>Great attention to detail</li>
      </div>
      <div className='bio--right'>
        <li><span>Massdrop</span>&nbsp;&nbsp;&nbsp;2019</li>
        <li><span>SS&C</span>&nbsp;&nbsp;&nbsp;2017</li>
        <li><span>NYU</span>&nbsp;&nbsp;&nbsp;2016</li>
      </div>
    </div>

    <h4>What I'm doing right now...</h4>
    <div className='bio--right_now'>
      <li>Work</li>
      <li>Building out features on this site</li>
      <li>Trying to get better at ping pong</li>
    </div>
    
    <Spacer height={40} />
    <Button
      href='https://docdro.id/mbNvZtM'
      text='View Full Resume'
    />
  </section>
);

export default Biography;
