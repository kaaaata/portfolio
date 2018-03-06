import React, { Component } from 'react';
import './Projects.css';

export default class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        { name: 'THE HAPPINESS PROJECT', image: 'thp.png', shade: 'yellow',
          github: 'https://github.com/kaaaata/the-happiness-project', url: 'https://the-happiness-project.herokuapp.com',
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Lo-Dash'],
          blurb: 'The Happiness Project shares stories of what makes people happy. Under construction.' },
        { name: 'JELLY', image: 'jelly.png', shade: 'blue',
          github: 'https://github.com/kaaaata/jelly', url: 'https://jellyfishapp.herokuapp.com/',
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'PostgreSQL', 'ExpressJS'],
          blurb: 'Jelly is a simple customizable terminal for browsing the web.' },
        { name: 'BIG 2', image: 'big2.png', shade: 'green',
          github: 'https://github.com/kaaaata/big-2', url: 'https://big2app.herokuapp.com',
          tools: ['HTML', 'CSS', 'JavaScript', 'PostgreSQL', 'ExpressJS', 'Lo-Dash'],
          blurb: 'Play against the AI in this Big 2 clone. Multiplayer coming soon.' },
        { name: 'QUIKKER', image: 'uber.jpg', shade: 'black',
          github: 'https://github.com/kaaaata/thesis', url: null,
          tools: ['JavaScript', 'ExpressJS', 'Mocha', 'New Relic', 'Siege', 'Lo-Dash'],
          blurb: 'Quikker is a backend clone of Uber\'s matching microservice API.' },
        { name: 'PORTFOLIO', image: 'portfolio.png', shade: 'purple',
          github: 'https://github.com/kaaaata/portfolio', url: 'http://www.kaaaata.com',
          tools: ['HTML', 'CSS', 'Sass', 'JavaScript', 'React', 'Lo-Dash'],
          blurb: 'This website!' },
        { name: 'XELP', image: 'xelp.png', shade: 'orange',
          github: 'https://github.com/kaaaata/yelp1', url: null,
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Travis CI', 'Lo-Dash'],
          blurb: 'Xelp is a fullstack Yelp clone. I developed the search feature.'}
      ],
    };
  }

  render() {
    return (
      <div className="projects">
        <div className="title">PROJECTS</div>
        {this.state.projects.map((project, index) => (
          <div key={index} className="project">

            <div
              key={index}
              className="background"
              style={{ backgroundImage: `url(${require(`./assets/projects/${project.image}`)})` }}
            />
            
            <div
              className="foreground"
              onClick={() => window.open(project.url ? project.url : project.github, '_blank')}
              style={{ backgroundColor: project.shade }}
            >
              <div className="name">{project.name}</div>
            </div>                

            <div className="blurb">
              <div>
                {project.blurb}<br />&nbsp;
                <a href={project.github} target="_blank">
                  <span className="link"><u>GitHub</u></span>
                </a>
              </div>
              <div className="tools">
                {project.tools.map((tool, index) => (
                  <div key={index} className="tool">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    );
  }
}
