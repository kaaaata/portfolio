import React, { Component } from 'react';
import './Skills.css';

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
        { skill: 'Python', image: 'python.png', specs: ['Python 3.X', 'Python 2.X'] },
        { skill: 'Visual Basic', image: 'vba.png', specs: ['VBA for Excel'] },
        { skill: 'R', image: 'r.png', specs: ['Multivariate Statistics', 'Time Series'] },
      ],
    };
  }

  render() {
    return (
      <div className="skills">
        <div className="skills-title">SKILLS</div>
        {this.state.skills.map((skill, index) => (
          <div key={index} className="skill">
            <div className="skill-left">
              <div className="skill-image" style={{ backgroundImage: `url(${require(`./assets/skills/${skill.image}`)})` }} />
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
    );
  }
}
