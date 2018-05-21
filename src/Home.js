import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/Home.css';

export class FireworksToggle extends Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: 'color',
    }
  }

  render() {
    const { backgroundImage } = this.state;

    return (
      <button
        className="fireworks-toggle"
        onClick={() => {
          document.getElementById('canvas').style.opacity = document.getElementById('canvas').style.opacity === '0' ? '1' : '0';
          this.setState({ backgroundImage: backgroundImage === 'color' ? 'black_and_white' : 'color' });
        }}
        style={{ backgroundImage: `url(${require(`./assets/fireworks_${backgroundImage}.png`)})` }}
      />
    );
  }
}

export const Header = (props) => {
  const { title } = props;

  return (
    <section className="home-header">
      <Link to="/">
        <div className="logo" />
      </Link>
      <h1>{title}</h1>
      {['Home', 'Projects', 'Skills', 'About'].map(nav => (
        <Link
          key={nav}
          className="link"
          to={`/${nav === 'Home' ? '' : nav.toLowerCase()}`}
          onClick={() => window.scroll(0, 0)}
        >
          <p>{nav.toUpperCase()}</p>
        </Link>
      ))}
    </section>
  );
};

export const Selfie = () => {
  return (
    <article className="home-selfie">
      <div className="pic" />
    </article>
  );
};

export const Blurb = () => {
  return (
    <section className="home-blurb">
      <h1>Fullstack Software Engineer</h1>
      <article className="bio">
        <p>I bring ideas to life on the screen through clean, intuitive code.
        </p>
        <p>
          I build fullstack web applications using the latest features in HTML5, CSS3, and JavaScript ES7. Familiar with React/Redux, Node.js, Django, Sass, and Postgres.
        </p>
      </article>
    </section>
  );
};

export const Footer = () => {
  return (
    <section className="home-footer">
      <div className="line-break" />
      <h1 className="name">Catherine Han</h1>
      <h3 className="email">catherinehan714@gmail.com</h3>
      {[
        { image: 'linkedin.png', url: 'https://www.linkedin.com/in/kaaaata/' },
        { image: 'github.png', url: 'https://github.com/kaaaata/' },
        { image: 'facebook.png', url: 'https://www.facebook.com/blueconiferforest/' },
        { image: 'dota.png', url: 'https://www.dotabuff.com/players/125258124/' },
      ].map(media => (
        <a
          key={media.image}
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div key={media.image} className="media" style={{
            backgroundImage: `url(${require(`./assets/media/${media.image}`)})`
          }} />
        </a>
      ))}
    </section>
  );
};
  