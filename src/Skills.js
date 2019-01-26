import React from 'react';
import { debounce } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, mixins, mq } from './styles';
import { Image, Spacer, FlexContainer } from './particles';
import { trackStats } from './utils/graphql';

const skills = [
  {
    name: 'React',
    description: 'I\'ve used React extensively at work and in side projects. Probably 50% of my total time spent coding right now is React...',
    flavorTexts: ['Familiar with React 15/16', 'Fragments FTW.']
  },
  {
    name: 'Redux',
    description: 'Redux is a flux state container I use in my side projects. Hoping to gain professional experience with it at some point!',
    flavorTexts: ['This site uses Redux lightly']
  },
  {
    name: 'Fluxible',
    description: 'Fluxible is a flux state container tech I use in conjunction with React at Massdrop. It\'s similar to Redux, but uses handlers to store data in multiple stores instead of reducing to a single store.',
    flavorTexts: ['I\'ve worked on one of largest repos out there that uses Fluxible!']
  },
  {
    name: 'Git',
    description: 'I use Git to manage all my projects. Having experimented with various Git softwares, I still prefer the command line...',
    flavorTexts: ['The most useful command: git symbolic-ref --short -q HEAD', 'GitKraken is cool']
  },
  {
    name: 'Node',
    description: 'On the backend, Node is my most comfortable environment. I have experience working in Express, and have also experimented with GraphQL.'
  },
  {
    name: 'GraphQL',
    description: 'I\'ve only recently picked up GraphQL, but it has been a blast working with it so far. I aspire at some point to gain professional experience working with GraphQL on a large scale application.',
    flavorTexts: ['This website is GraphQL powered!']
  },
  {
    name: 'Sass',
    description: 'SASS/SCSS are style sheet languages I\'ve used both professionally and in side projects. They are very cool, especially Sass with its syntax, but CSS-in-JS is on another level.'
  },
  {
    name: 'Emotion',
    description: 'Emotion is a new CSS-in-JS library that is lightweight, powerful, and fast. It combines JavaScript and SCSS to allow users to write SCSS as JS template literals.',
    flavorTexts: ['100% of this site\'s CSS is in Emotion!', 'I want to learn more about effective CSS-in-JS code patterns']
  },
  {
    name: 'Bash',
    description: 'I\'m still a newbie when it comes to Bash scripting, but I have been able to come up with some cool and useful aliases, functions, and scripts.',
    flavorTexts: [
      "export PS1='🌊🌊🌊  ${PWD##*/} 🤸  '", // eslint-disable-line no-template-curly-in-string
      'Hyper terminal is worth checking out'
    ]
  },
  {
    name: 'Python',
    description: 'I have some experience scripting professionally in Python, writing re-usable scripts to help coworkers automate workflow involving Windows filesystems and Excel spreadsheet manipulation. I\'ve also experimented with building a RESTful API with Django.'
  },
  {
    name: 'Redis',
    description: 'Not much to say here, I use it at work.'
  },
  {
    name: 'MySQL',
    description: '*page intentionally left blank*'
  },
  {
    name: 'Postgres',
    description: 'Postgres is my database tech of choice for side projects. I use it with the Knex library, and overall working with them has been wonderful. Additionally, Heroku\'s got a great Postgres add-on, allowing for easy database deployment.'
  },
  {
    name: 'Heroku',
    description: 'Heroku is a cloud platform that enables easy deployment of both full stack and serverless web apps. I\'ve deployed many different projects to Heroku (with only mild amounts of headache....)',
    flavorTexts: ['This site is hosted on Heroku!']
  },
];

const skillsCss = css`
  margin: auto;
  position: relative;
`;
const skillsFeatureCss = activeSkill => css`
  width: 100%;
  border: 2px dashed ${activeSkill ? colors.green : colors.grey};
  height: 400px;
  border-radius: 40px;
  padding: 30px;

  .featured_skill_image {
    margin-right: 30px;
    flex: none;
    border-radius: 20%;
    
    ${mixins.keyframes('waxAndWane', `
      0%, 100% { transform: scale(1.1); }
      50% { transform: scale(1); }
    `)}

    animation: waxAndWane 2.5s infinite ease-in-out;
  }

  .inspect_icon {
    filter: invert(50%);
  }

  p.also {
    color: ${colors.white};
  }

  ${mq.phone(`
    display: none;
  `)}
`;
const skillCss = css`
  padding: 10px;
  cursor: pointer;

  .image {
    margin: auto;
    border-radius: 20%;
  }

  h4 {
    text-align: center;
  }
`;

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
      <div css={css`flex-grow: 1;`}>
        <h1>{name}</h1>
        <p>{description}</p>
        {flavorTexts && <>
          <p className='also'>Also...</p>
          {flavorTexts.map(pointer => (
            <li key={pointer}>{pointer}</li>
          ))}
        </>}
      </div>
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
