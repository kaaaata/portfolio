import React, { Component } from 'react';
import './styles/Projects.css';

export default class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [
        { name: 'DAY LOGGER', image: 'day.png', shade: 'pink',
          github: 'https://github.com/kaaaata/day-logger', url: 'https://day-logger.herokuapp.com/',
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'Sass', 'PostgreSQL', 'NodeJS'],
          blurb: 'A simple app to track your happiness and productivity.' },
        { name: 'JELLY', image: 'jelly.png', shade: 'blue',
          github: 'https://github.com/kaaaata/jelly', url: 'https://jellyfishapp.herokuapp.com/',
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'PostgreSQL', 'NodeJS'],
          blurb: 'Jelly is a simple customizable terminal for browsing the web.' },
        { name: 'BIG 2', image: 'big2.png', shade: 'green',
          github: 'https://github.com/kaaaata/big-2', url: 'https://big2app.herokuapp.com',
          tools: ['HTML', 'CSS', 'JavaScript', 'PostgreSQL', 'NodeJS'],
          blurb: 'Play against the AI in this Big 2 clone. Multiplayer coming soon.' },
        { name: 'QUIKKER', image: 'uber.jpg', shade: 'black',
          github: 'https://github.com/kaaaata/quikker', url: null,
          tools: ['JavaScript', 'NodeJS', 'Mocha', 'New Relic', 'Siege'],
          blurb: 'Quikker is a backend clone of Uber\'s matching microservice API.' },
        { name: 'PORTFOLIO', image: 'portfolio.png', shade: 'purple',
          github: 'https://github.com/kaaaata/portfolio', url: null,
          tools: ['HTML', 'CSS', 'Sass', 'JavaScript', 'React'],
          blurb: 'This website!' },
        { name: 'XELP', image: 'xelp.png', shade: 'orange',
          github: 'https://github.com/kaaaata/xelp', url: null,
          tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Travis CI'],
          blurb: 'Xelp is a fullstack Yelp clone. I developed the search feature.'}
      ],
    };
  }

  render() {
    return (
      <div className="projects">
        <div className="title">PROJECTS</div>
        <div className="container">
          {this.state.projects.map((project, index) => (
            <div key={index} className="project">

              <div
                key={index}
                className="background"
                style={{ backgroundImage: `url(${require(`./assets/projects/${project.image}`)})` }}
              />
              
              
              <a href={project.url ? project.url : project.github} target="_blank">
                <div
                  className="foreground"
                  style={{ backgroundColor: project.shade }}
                >
                  <div className="name">{project.name}</div>
                </div>                
              </a>

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
      </div>
    );
  }
}
