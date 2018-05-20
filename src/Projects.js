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

  nextSlide() {
    const { images } = this.props;
    this.setState({ index: this.state.index === images.length - 1 ? 0 : this.state.index + 1 });
  }

  startSlideshow() {
    this.setState({ interval: setInterval(() => {
      this.nextSlide();
    }, 5000) });
  }

  endSlideshow() {
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    this.startSlideshow();
  }

  componentWillUnmount() {
    this.endSlideshow();
  }

  render() {
    const { index } = this.state;
    const { images, mini } = this.props;

    return (
      <div className={mini ? 'slideshow mini' : 'slideshow'}>
        <div
          className="pic"
          onClick={() => {
            this.endSlideshow();
            this.nextSlide();
            this.startSlideshow();
          }}
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
        <a href={github} target="_blank">
          <PimpyButton>GitHub Repo</PimpyButton>
        </a>
        {url && <a href={url} target="_blank">
          <PimpyButton>Check it out</PimpyButton>
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
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <h3>Technologies</h3>
        <ul>
          {technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        <h3>{details.what}</h3>
        <p>{details.description}</p>
        <ul>
          {details.pointers.map((pointer, index) => (
            <li key={index}>
              <h3>{pointer.event}</h3>
              <ul>
                {pointer.actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <h3>Next Steps</h3>
        <ul>
          {nextSteps.map((nextStep, index) => (
            <li key={index}>{nextStep}</li>
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
