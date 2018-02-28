import React, { Component } from 'react';
import './Projects.css';
const _ = require('lodash');

export default class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: _.chunk([
        { name: 'THE HAPPINESS PROJECT', image: 'thp.png', shade: 'yellow',
          github: 'https://github.com/kaaaata/the-happiness-project', url: 'https://the-happiness-project.herokuapp.com',
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Lo-Dash'],
          blurb: 'The Happiness Project shares stories of what makes people happy. Currently under construction.' },
        { name: 'JELLY', image: 'jelly.png', shade: 'blue',
          github: 'https://github.com/kaaaata/jelly', url: 'https://jellyfishapp.herokuapp.com/',
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'PostgreSQL', 'ExpressJS'],
          blurb: 'Jelly is a simple web app - a customizable terminal for browsing the web. Create your own commands :)' },
        { name: 'BIG 2', image: 'big2.png', shade: 'green',
          github: 'https://github.com/kaaaata/big-2', url: 'https://big2app.herokuapp.com',
          tools: ['HTML', 'CSS', 'JavaScript', 'PostgreSQL', 'ExpressJS', 'Lo-Dash'],
          blurb: 'Play against the AI in this Big 2 clone built with plain HTML/CSS/JS. Currently working on multiplayer.' },
        { name: 'UBER BACKEND CLONE', image: 'uber.jpg', shade: 'black',
          github: 'https://github.com/kaaaata/thesis', url: null,
          tools: ['JavaScript', 'ExpressJS', 'Mocha', 'New Relic', 'Siege', 'Lo-Dash'],
          blurb: 'This project is a clone of Uber\'s backend matching microservice API.' },
        { name: 'PORTFOLIO', image: 'portfolio.png', shade: 'purple',
          github: 'https://github.com/kaaaata/portfolio', url: 'https://www.kaaaata.com',
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Lo-Dash'],
          blurb: 'This website!' },
        { name: 'XELP', image: 'xelp.png', shade: 'orange',
          github: 'https://github.com/kaaaata/yelp1', url: null,
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Travis CI', 'Lo-Dash'],
          blurb: 'Xelp is a fullstack Yelp clone I built with a group of four. I designed the search feature, front-end and back-end.'}
      ], 3),
    };
  }
  render() {
    return (
      <div className="projects">
        <div className="project-title">PROJECTS</div>
        {this.state.projects.map((two, index) => (
          <div key={index} className="projects-row">
            {two.map((project, index) => (
              <div key={index} className="project">
                <div key={index} className="project-background" style={{ backgroundImage: `url(${require(`./assets/projects/${project.image}`)})` }} />
                <div className="project-foreground-color" style={{ backgroundColor: project.shade }}>
                  <div className="project-name">{project.name}</div>
                </div>                
                <div className="project-blurb">
                  <div>
                    {project.blurb}<br />&nbsp;
                    <a href={project.github}>
                      <span className="project-link"><u>GitHub</u></span>
                    </a>
                    {project.url &&
                      <span>&nbsp;|&nbsp; 
                        <a href={project.url}>
                          <span className="project-link"><u>Website</u></span>
                        </a>
                      </span>
                    }
                  </div>
                  <div className="project-tools">
                  {project.tools.map((tool, index) => (
                    <div key={index} className="project-tool">
                      {tool}
                    </div>
                  ))}
                </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      </div>
    );
  }
}


