import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { PimpyButton } from './StyledComponents';

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
    }, 5000)});
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { index } = this.state;
    const { images, mini } = this.props;

    return (
      <div className={mini ? 'slideshow mini' : 'slideshow'}>
        <div
          className="pic"
          style={{
            backgroundImage: `url(${require(`./assets/projects/${images[index]}`)})`
          }}
        />
      </div>
    );
  }
};

export const Feature = (props) => {
  const { images, name, blurb, route, github, url } = props.project;
  const { mini } = props;

  return (
    <section className="feature">
      <Slideshow images={images} mini={mini} />
      <article className="info">
        <h2>{name}</h2>
        <p className="blurb">{blurb}</p>
        <Link className="link" to={`/${route}`} onClick={() => window.scroll(0, 0)}>
          <PimpyButton>More on {name}</PimpyButton>
        </Link>
        {url && <a href={url} target="_blank">
          <PimpyButton>Check it out</PimpyButton>
        </a>}
        <a href={github} target="_blank">
          <PimpyButton>GitHub Repo</PimpyButton>
        </a>
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
