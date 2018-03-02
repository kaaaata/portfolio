import React, { Component } from 'react';
import './Skills.css';
const _ = require('lodash');

export default class Skills extends Component {
  constructor() {
    super();
    this.state = {
      skills: [
        { skill: 'HTML', image: 'html.png', specs: ['HTML5'] },
        { skill: 'CSS', image: 'css.png', specs: ['CSS3'] },
        { skill: 'JavaScript', image: 'js.png', specs: ['ES7', 'Node/ExpressJS', 'JSX'] },
        { skill: 'React', image: 'react.png', specs: ['React 16', 'React Router 4'] },
        { skill: 'SQL', image: 'sql.png', specs: ['PostgreSQL'] },
        { skill: 'Git', image: 'git.png', specs: ['GitHub', 'Git Command Line'] },
      ],
      skillsPerRow: 3,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ skillsPerRow: window.innerWidth >= 950 ? 3 : (window.innerWidth >= 625 ? 2 : 1) });
    });
  }

  render() {
    return (
      <div className="skills">
        <div className="skills-title">SKILLS</div>
        {_.chunk(this.state.skills, this.state.skillsPerRow).map((three, index) => (
          <div key={index} className="skills-row">
            {three.map((skill, index) => (
              <div key={index} className="skill">
                <div className="skill-left">
                  <div className="skill-image" style={{ backgroundImage: `url(${require(`./assets/${skill.image}`)})` }} />
                </div>
                <div className="skill-right">
                  <div className="skill-specs">
                    {skill.specs.map((spec, index) => (
                      <div key={index} className="skill-spec">{spec}</div>
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
