import React, { Component } from 'react';
import './styles/Skills.css';

export default class Skills extends Component {
  constructor() {
    super();
    this.state = {
      skills: [
        { skill: 'HTML', image: 'html.png', specs: ['HTML5'] },
        { skill: 'CSS', image: 'css.png', specs: ['CSS3', 'Sass', 'Flexbox/Grid'] },
        { skill: 'JavaScript', image: 'js.png', specs: ['ES7', 'Node/ExpressJS', 'Mocha'] },
        { skill: 'React', image: 'react.png', specs: ['React 16', 'React-Redux', 'React Router 4'] },
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
        <div className="title">SKILLS</div>
        <div className="container">
          {this.state.skills.map((skill, index) => (
            <div key={index} className="skill">
              <div className="left">
                <div className="image" style={{ backgroundImage: `url(${require(`./assets/skills/${skill.image}`)})` }} />
              </div>
              <div className="right">
                <div className="specs">
                  {skill.specs.map((spec, index) => (
                    <div key={index} className="spec">{spec}</div>
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
