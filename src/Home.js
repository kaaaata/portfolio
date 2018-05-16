import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Home.css';

export const Header = () => {
  return (
    <section className="home-header">
      <Link to="/">
        <div className="logo" />
      </Link>
      <h1>Catherine Han</h1>
    </section>
  );
};

export const Selfie = () => {
  return (
    <section className="home-selfie">
      <div className="pic" />
    </section>
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
      <h1 className="name">Catherine Han</h1>
      <a href="mailto:catherinehan714@gmail.com">
        <h3 className="email">catherinehan714@gmail.com</h3>
      </a>
      {[
        { image: 'linkedin.png', url: 'https://www.linkedin.com/in/kaaaata/' },
        { image: 'github.png', url: 'https://www.linkedin.com/in/kaaaata/' },
        { image: 'facebook.png', url: 'https://www.linkedin.com/in/kaaaata/' },
        { image: 'dota.png', url: 'https://www.linkedin.com/in/kaaaata/' },
      ].map(media => (
        <a key={media.image} href={media.url} target="_blank">
          <div
            key={media.image}
            className="media"
            style={{
              backgroundImage: `url(${require(`./assets/media/${media.image}`)})`
            }}
          />
        </a>
      ))}
    </section>
  );
};
