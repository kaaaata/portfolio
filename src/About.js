import React from 'react';

import { PimpyButton } from './StyledComponents';

import './styles/About.css';

export const About = () => {
  return (
    <section className="about">
      <article className="selfie">
        <div className="pic" />
      </article>
      <article className="bio">
        <p>
          I'm Catherine, a software engineer based in San Francisco, and this is my story.
        </p>
        <p>
          In 2017, I was an Analyst working for a financial services company. When I realized that Python and VBA scripting could automate a good deal of my team's work, I started to independently study coding. After writing macros for a few months, I realized that I really loved writing code, so I quit my job to fully pursue a career in software engineering. I invested three months into Hack Reactor, a top coding bootcamp in San Francisco, to learn fullstack web development using JavaScript. Since then, I have been working to become the best software engineer I can be, learning new skills and working on fullstack applications daily. Specific areas of interest to me are machine learning, AI, and statistics. 
        </p>
        <p>
          Outside of coding, I love to play Chess and Dota 2.
        </p>
      </article>
    </section>
  );
};

export const Resume = () => {
  return (
    <section className="resume">
      <h2>Check out my resume!</h2>
      <br />
      <a
        href="https://www.docdroid.net/cW5Az4s/catherine-hans-resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PimpyButton>Resume</PimpyButton>
      </a>
    </section>
  );
};
