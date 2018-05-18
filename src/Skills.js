import React from 'react';

import './styles/Skills.css';
  
export const Skills = (props) => {
  const { skills } = props;

  return (
    <section className="skills">
      {skills.map(skill => (
        <figure className="skill" key={skill}>
          <div className="logo" style={{
            backgroundImage: `url(${require(`./assets/skills/${skill.toLowerCase()}.png`)})`
          }} />
          <figcaption className="name">
            <h3>{skill}</h3>
          </figcaption>
        </figure>
      ))}
    </section>
  );
};
