import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

export const Header = () => {
  return (
    <section className="home-header">
      <Link to="/">
        <div className="logo" />
      </Link>
      <h1>CATHERINE HAN</h1>
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
