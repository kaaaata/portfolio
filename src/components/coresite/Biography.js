import React from 'react';
import { Spacer, Button, FlexContainer, FlexItem } from '../particles';
import { trackStats } from '../utils/graphql';
import { biographyCss } from './biographyCss';

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
        <li><span>Drop</span>&nbsp;&nbsp;&nbsp;2018-Present</li>
        <li><span>SS&C</span>&nbsp;&nbsp;&nbsp;2017-2018</li>
        <li><span>NYU</span>&nbsp;&nbsp;&nbsp;2012-2016</li>
      </div>
    </FlexContainer>

    <h4>What I'm doing right now...</h4>
    <div className='bio_section'>
      <li>Work</li>
      <li>Trying to incrase my table tennis rating from 300 to 500</li>
      <li>2007scape</li>
    </div>

    <Spacer height={40} />
    <Button
      href='https://docdro.id/D0ypleg'
      text='View Full Resume'
      onClick={() => trackStats('viewed_resume')}
    />
  </FlexContainer>
);

export default Biography;
