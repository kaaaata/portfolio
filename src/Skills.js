import React from 'react';
import Draggable from 'react-draggable';
import { find } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, zIndex, mixins, mq } from './styles';
import { Image, Spacer } from './particles';

const skills = [
  {
    name: 'React',
    description: 'I\'ve used React extensively at work and in side projects. Probably 50% of my total time spent coding went into React!',
    flavorTexts: ['Familiar with React 15/16', 'Fragments FTW.']
  },
  {
    name: 'Redux',
    description: 'Redux is a flux state container I use in my side projects. Hoping to gain professional experience with it at some point!',
    flavorTexts: ['This site has functional Redux architecture built into it...', '...but is currently too small to make any sensible use of it!']
  },
  {
    name: 'Fluxible',
    description: 'Fluxible is a flux state container tech I used in conjunction with React at Massdrop. It\'s similar to Redux, but uses handlers to store data in multiple stores instead of reducing to a single store.',
    flavorTexts: ['I\'ve worked on one of largest repos out there that uses Fluxible!']
  },
  {
    name: 'Git',
    description: 'I use Git to manage all my projects. Having experimented with various Git softwares, I still prefer the command line...',
    flavorTexts: ['The most useful command: git symbolic-ref --short -q HEAD']
  },
  {
    name: 'Node',
    description: 'On the backend, Node is my most comfortable language. I have experience working in Express, and have also experimented with GraphQL and Koa.'
  },
  {
    name: 'GraphQL',
    description: 'I\'ve only recently picked up GraphQL, but it has been a blast working with it so far. I aspire at some point to gain professional experience working with GraphQL on a large scale application.',
    flavorTexts: ['This website utilizes GraphQL!']
  },
  {
    name: 'Sass',
    description: 'SASS/SCSS are style sheet languages I\'ve used both professionally and in side projects. They are very cool, especially Sass with its pimpy syntax, but CSS-in-JS is on another level.'
  },
  {
    name: 'Emotion',
    description: 'Emotion is a new CSS-in-JS library that is lightweight, powerful, and fast. It combines JavaScript and SCSS to allow users to write SCSS as JS template literals, allowing for WILD dynamic styling possibilities and code reusability.',
    flavorTexts: ['100% of this site\'s CSS is from Emotion!']
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
    description: 'Postgres is my database tech of choice for side projects. Using the Knex library to interface server-side JavaScript with Postgres (and also for migrations), working with this tech has been wonderful. Additionally, Heroku has a great Postgres add-on, allowing for easy deployment of Postgres-powered web apps.'
  },
  {
    name: 'Heroku',
    description: 'Heroku is a cloud platform that enables easy deployment of both full stack and serverless web apps. I\'ve deployed many different projects to Heroku.',
    flavorTexts: ['This site is hosted on Heroku!']
  },
];

const waxAndWane = duration => `
  ${mixins.keyframes('waxAndWane', `
    0%, 100% { transform: scale(1.1); }
    50% { transform: scale(1); }
  `)}

  animation: waxAndWane ${duration} infinite ease-in-out;
`;
const skillsCss = css`
  max-width: 750px;
  margin: auto;
  display: flex;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;

  .react-draggable-dragging {
    ${mq.tabletAndDesktop(`
      .image {
        ${waxAndWane('1s')}
      }
    `)}

    ${mq.phone(`
      transform: none !important;
    `)}
  }
`;
const skillsFeatureCss = (draggedSkill, activeSkill) => css`
  width: 100%;
  border: 2px dashed ${draggedSkill
    ? colors.yellow
    : activeSkill ? colors.green : colors.grey};
  height: 400px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: ${activeSkill ? 'unset' : 'center'};
  z-index: ${zIndex.mouseEventAreaBackground};
  padding: 30px;

  .drag_n_drop {
    filter: invert(100%);
  }

  .featured_skill_image {
    margin-right: 30px;
    flex: none;
    border-radius: 20%;
    ${waxAndWane('2.5s')}
  }

  p, li, span {
    color: ${colors.grey};

    &.also {
      color: ${colors.white};
    }
  }

  ${mq.phone(`
    display: none;
  `)}
`;
const skillCss = css`
  z-index: ${zIndex.default};
  margin: 10px;
  cursor: pointer;

  .image {
    margin: auto;
    border-radius: 20%;
  }

  .skill_name {
    margin-top: 5px;
    text-align: center;
  }
`;

const FeaturedSkillContent = ({ activeSkill }) => {
  if (!activeSkill) {
    return (
      <Image
        className='drag_n_drop'
        src='dragndrop.png'
        width={50}
        height={50}
      />
    );
  }

  const { name, description, flavorTexts } = find(skills, i => i.name === activeSkill);

  return <>
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
};

class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      draggedSkill: null,
      activeSkill: null,
    };

    this.isHoveringDropZone = false;
  }

  handleDragSkillStart(skillName) {
    this.setState({ draggedSkill: skillName });
  }

  handleDragSkillStop() {
    this.setState({
      activeSkill: this.isHoveringDropZone
        ? this.state.draggedSkill
        : this.state.activeSkill,
      draggedSkill: null
    });
  }

  render() {
    const { draggedSkill, activeSkill } = this.state;

    return (
      <article
        id='skills'
        css={skillsCss}
      >
        <h1>Skills</h1>
        <div
          css={skillsFeatureCss(draggedSkill, activeSkill)}
          onMouseEnter={() => { this.isHoveringDropZone = true; }}
          onMouseLeave={() => { this.isHoveringDropZone = false; }}
        >
          <FeaturedSkillContent activeSkill={activeSkill} />
        </div>
        <Spacer height={[20, 20, 0]} />
        {skills.map(skill => (
          <Draggable
            bounds='parent'
            onStart={() => this.handleDragSkillStart(skill.name)}
            onStop={() => this.handleDragSkillStop()}
            position={{ x: 0, y: 0 }}
            key={skill.name}
          >
            <div css={skillCss}>
              <Image
                src={`skills/${skill.name.toLowerCase()}.png`}
                width={50}
                height={50}
                size='contain'
              />
              <div className='skill_name'>{skill.name}</div>
            </div>
          </Draggable>
        ))}
        <Spacer size={40} />
      </article>
    );
  }
}

export default Skills;
