import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { SlideyButton } from './StyledComponents';

import './styles/Projects.css';

class Slideshow extends Component {
  constructor() {
    super();
    this.state = {
      index: 0, // slideshow index
      interval: null, // slideshow interval
    };
  }

  componentDidMount() {
    this.setState({ interval: setInterval(() => {
      this.setState({ index: this.state.index === 2 ? 0 : this.state.index + 1 });
    }, 5000)})
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { index } = this.state;
    const { images } = this.props.project;
    const { mini } = this.props;

    return (
      <div className={mini ? 'slideshow mini' : 'slideshow'}>
        <div className="pic" style={{
          backgroundImage: `url(${require(`./assets/${images[index]}`)})`
        }} />
      </div>
    );
  }
};

export const Feature = (props) => {
  const { images, name, blurb, route, github, url } = props.project;
  const { mini } = props;

  return (
    <section className="feature">
      <Slideshow {...props} />
      <article className="info">
        <h2>{name}</h2>
        <p className="blurb">{blurb}</p>
        <Link className="link" to={`/${route}`}>
          <SlideyButton>More on {name}</SlideyButton>
        </Link>
        <a href={github} target="_blank">
          <SlideyButton>GitHub Repo</SlideyButton>
        </a>
        {url && <a href={url} target="_blank">
          <SlideyButton>Check it out</SlideyButton>
        </a>}
      </article>
    </section>
  );
};

export const Project = (props) => {
  const { features, technologies, details, nextSteps } = props.project; 

  return (
    <section className="project">
      <Feature {...props} />
      <article className="info">
        <h3>Features</h3>
        <ul>
          {features.map(feature => (
            <li>{feature}</li>
          ))}
        </ul>
        <h3>Technologies</h3>
        <ul>
          {technologies.map(tech => (
            <li>{tech}</li>
          ))}
        </ul>
        <h3>{details.what}</h3>
        <p>{details.description}</p>
        <ul>
          {details.pointers.map(pointer => (
            <li>
              <h3>{pointer.event}</h3>
              <ul>
                {pointer.actions.map(action => (
                  <li>{action}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <h3>Next Steps</h3>
        <ul>
          {nextSteps.map(nextStep => (
            <li>{nextStep}</li>
          ))}
        </ul>
      </article>
    </section>
    
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
