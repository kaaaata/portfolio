import React from 'react';
import Draggable from 'react-draggable';
import { find } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, zIndex } from './styles';
import { Image, Spacer } from './particles';

const skills = [
  {
    name: 'React',
    description: 'I\'ve used React extensively at work and in side projects. Probably 50% of all my hours spent coding ever went into React!'
  },
  {
    name: 'Redux',
    description: 'Redux is a flux state container I use in my side projects. Hoping to gain professional experience with it at some point!',
    flavorTexts: ['This site has Redux as a dependency, but doesn\'t actually use it!']
  },
  {
    name: 'Fluxible',
    description: 'Fluxible is a flux state container tech I use in conjunction with React at Massdrop. It\'s similar to Redux, but different semantically.'
  },
  {
    name: 'Git',
    description: 'I use Git to manage all my projects.'
  },
  {
    name: 'Node',
    description: 'On the backend, Node is my most comfortable language. I have experience working in Express, and have also experimented with GraphQL and Koa.'
  },
  {
    name: 'GraphQL',
    description: 'I\'ve only recently picked up GraphQL, but it has been a blast working with it so far. A few more layers of abstraction are required to get a simple server up and running for a project, but the much increased flexibility in what you can do with "endpoint functionality" in the form of queries has been much appreciated. While writing "post" type queries has been more difficult, writing "get" type queries have been a breeze.',
    flavorTexts: ['This website utilizes GraphQL!']
  },
  {
    name: 'Sass',
    description: 'SASS/SCSS are style sheet languages I\'ve used both professionally and in side projects. It\'s feature rich and fun to write!'
  },
  {
    name: 'Emotion',
    description: 'Emotion is a new CSS-in-JS library that is lightweight, powerful, and fast. It is a combination of JavaScript and SCSS, allowing the user to write SCSS syntax as a Javascript template literal, allowing for WILD dynamic styling possibilities and code reusability.',
    flavorTexts: ['100% of this site\'s CSS is from Emotion!']
  },
  {
    name: 'Bash',
    description: 'I\'m still a newbie when it comes to Bash scripting, but I have been able to come up with some cool and useful aliases, functions, and scripts. My opinion of Bash is, it\'s pretty confusing and time-consuming to learn, but the payoff is worth it.'
  },
  {
    name: 'Python',
    description: 'I have some experience scripting professionally in Python, writing re-usable scripts to help coworkers automate workflow involving Windows filesystems and Excel spreadsheet manipulation. I\'ve also experimented with building a RESTful API with Django.',
    flavorTexts: ['My first programming language!']
  },
  {
    name: 'Redis',
    description: 'Not much to say here, I use it at work.'
  },
  {
    name: 'MySQL',
    description: 'I use MySQL at Massdrop, both using raw queries and through Sequelize.'
  },
  {
    name: 'Postgres',
    description: 'Postgres is my database tech of choice for side projects. Using the Knex library to allow server-side JavaScript to interface with Postgres (and also for migrations), working with this tech has been a stroll in the park. Additionally, Heroku has a great Postgres add-on, allowing for easy deployment of Postgres-powered web apps.'
  },
  {
    name: 'Heroku',
    description: 'Heroku is a cloud platform that allows you to easily deploy both full stack and serverless web apps.',
    flavorTexts: ['This site is hosted on Heroku!']
  },
];

const skillsCss = css`
  display: flex;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
`;
const skillsFeatureCss = (draggedSkill, activeSkill) => css`
  width: 100%;
  border: 2px dashed ${draggedSkill
    ? colors.yellow
    : activeSkill ? colors.green : colors.grey};
  height: 400px;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: ${activeSkill ? 'unset' : 'center'};
  z-index: ${zIndex.mouseEventAreaBackground};
  padding: 20px;

  .image {
    margin-right: 20px;
    flex: none;
  }

  p, li, span {
    color: ${colors.grey};

    &.additionally {
      color: ${colors.white};
    }
  }
`;
const skillCss = isActive => css`
  z-index: ${zIndex.default};
  border: ${isActive ? '1px solid red' : 'none'};
  display: ${isActive ? 'none' : 'unset'};
  margin: 10px;
  cursor: default;

  .image {
    margin: auto;
  }

  .skill_name {
    margin-top: 5px;
    text-align: center;
  }
`;

const FeaturedSkillContent = ({ activeSkill }) => {
  if (!activeSkill) {
    return (
      <span>Drag 'n' Drop!</span>
    );
  }

  const { name, description, flavorTexts } = find(skills, i => i.name === activeSkill);

  return <>
    <Image
      src={`skills/${name.toLowerCase()}.png`}
      width={[125, 100, 75]}
      height={[125, 100, 75]}
      size='contain'
    />
    <div css={css`flex-grow: 1;`}>
      <h1>{name}</h1>
      <p>{description}</p>
      {flavorTexts && <>
        <p className='additionally'>Additionally...</p>
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
        <Spacer size={20} />
        {skills.map(skill => (
          <Draggable
            bounds='parent'
            onStart={() => this.handleDragSkillStart(skill.name)}
            onStop={() => this.handleDragSkillStop()}
            position={activeSkill === skill.name ? null : { x: 0, y: 0 }}
            key={skill.name}
          >
            <div css={skillCss(activeSkill === skill.name)}>
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
