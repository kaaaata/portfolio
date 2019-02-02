import React from 'react';
import { debounce } from 'lodash';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, FlexContainer, FlexItem } from '../particles';
import { trackStats } from '../utils/graphql';
import { skills } from '../utils/constants';
import { skillsCss, skillsFeatureCss, skillCss } from './skillsCss';

class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      activeSkill: null
    };

    this.trackActivateSkill = debounce((skillName) => {
      trackStats('viewed_skill', skillName);
    }, 500);
  }

  handleActivateSkill(skill) {
    this.setState({ activeSkill: skill });
    this.trackActivateSkill(skill.name);
  }

  render() {
    const { activeSkill } = this.state;
    const { name, description, flavorTexts } = activeSkill || {};

    const featuredSkillPlaceholder = (
      <Image
        className='inspect_icon'
        src='inspect.png'
        width={50}
        height={50}
      />
    );
    const featuredSkillContent = activeSkill && <>
      <Image
        className='featured_skill_image'
        src={`skills/${name.toLowerCase()}.png`}
        width={[125, 100, 75]} // 75 hidden in breakpoint
        height={[125, 100, 75]} // 75 hidden in breakpoint
        size='contain'
      />
      <FlexItem>
        <h1>{name}</h1>
        <p>{description}</p>
        {flavorTexts && <>
          <p className='also'>Also...</p>
          {flavorTexts.map(pointer => (
            <li key={pointer}>{pointer}</li>
          ))}
        </>}
      </FlexItem>
    </>;

    return (
      <FlexContainer
        id='skills'
        justifyContent='center'
        flexWrap='wrap'
        _css={skillsCss}
      >
        <h1>Skills</h1>
        <FlexContainer
          justifyContent='center'
          alignItems={activeSkill ? 'unset' : 'center'}
          _css={skillsFeatureCss(activeSkill)}
        >
          {activeSkill ? featuredSkillContent : featuredSkillPlaceholder}
        </FlexContainer>
        <Spacer height={[20, 20, 0]} />
        {skills.map(skill => (
          <div
            css={skillCss}
            key={skill.name}
            onMouseOver={() => this.handleActivateSkill(skill)}
            onClick={() => this.handleActivateSkill(skill)}
          >
            <Image
              src={`skills/${skill.name.toLowerCase()}.png`}
              width={[75, 40, 40]}
              height={[75, 40, 40]}
              size='contain'
            />
            <h4>{skill.name}</h4>
          </div>
        ))}
        <Spacer size={40} />
      </FlexContainer>
    );
  }
}

export default Skills;
