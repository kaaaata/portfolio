import React, { Component } from 'react';
import './About.css';

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <div><div className="about-content-image" /></div>
        <div className="about-content">
          <div className="about-blurb">
            Hi, my name is Catherine, and I build web apps with a focus on responsiveness and feel.
          </div>  
          <div className="about-content-text">
            Originally a Finance major, I was introduced to coding with Python and Excel VBA scripting. I was immediately drawn in, fascinated by how code could automate boring tasks, and create cool small programs. The area that I fell most deeply in love with, though, was front end web development. Now, I'm focusing my energy on becoming the best front end engineer I can be, learning new skills and working on projects daily.
          </div>
        </div>
      </div>
    );
  }
}
