import React from 'react';
import { Link } from 'react-router-dom';

import { SlideyButton } from './StyledComponents';

import './styles/Projects.css';

const Slideshow = () => {
  return (
    <div className="slideshow-wrapper">
    </div>
  );
};

export const Feature = (props) => {
  const { images, name, blurb, route, github, url } = props.project;
  const { mini } = props;

  return (
    <section className="feature">
      <div className={mini ? 'pic-mini' : 'pic'} style={{
        backgroundImage: `url(${require(`./assets/${images[0]}`)})`
      }} />
      <article className="info-mini">
        <h2>{name}</h2>
        <p className="blurb">{blurb}</p>
        <Link className="link" to={`/${route}`}>
          <SlideyButton>More on {name}</SlideyButton>
        </Link>
        <a href={github} target="_blank">
          <SlideyButton>GitHub</SlideyButton>
        </a>
        {url && <a href={url} target="_blank">
          <SlideyButton>Check it out</SlideyButton>
        </a>}
      </article>
    </section>
  );
};

export const Project = (props) => {
  return (
    <Feature {...props} />
  );
};

export const Projects = (props) => {
  return (
    <section className="projects">
      {props.projects.map(project => (
        <article key={project.name} className="project-mini">
          <Feature project={project} mini={true} />
        </article>
      ))}
    </section>
  );
};
