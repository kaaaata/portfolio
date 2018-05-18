import React from 'react';
import { Link } from 'react-router-dom';

import './styles/About.css';

export const About = () => {
  return (
    <section className="about">
      <h1>My Story</h1>
      <section className="content">
        <article className="selfie">
          <div className="pic" />
        </article>
        <article className="bio">
          <p>
            I'm Catherine, a software engineer based in San Francisco, and this is how I arrived at where I am today.
          </p>
          <p>
            In 2017, I was an Analyst working in financial services. One day, I realized that with Python & VBA scripting, much of my team's work could be automated. After writing these macros for a few months, I realized that I really loved coding, so I quit my job to fully pursue a career in software engineering. I invested three months in Hack Reactor, a top coding bootcamp in San Francisco, to learn fullstack web development in JavaScript. Since then, I have been devoting my energy to becoming the best software engineer I can be, learning new skills and working on fullstack web projects daily. Specific areas of interest to me include machine learning, AI, and statistics. 
          </p>
          <p>
            Outside of coding, my interests include Chess and Dota 2.
          </p>
        </article>
      </section>
    </section>
  );
};

export const Resume = () => {
  return (
    <button type="submit" onClick={() => window.open('../assets/Catherine Han\'s Resume.pdf')}>
      <h2>Click to view my Resume!</h2>
    </button>
  );
};
