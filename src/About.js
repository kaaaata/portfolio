import React, { Component } from 'react';
import './styles/About.css';

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <div><div className="image" /></div>
        <div className="content">
          <div className="blurb">
            Hi, my name is Catherine, and I build apps for the web.
          </div>
          <div className="text">
            Originally a Finance major, I was introduced to coding with scripting in Python and Excel VBA. I was immediately drawn in, fascinated by how code could automate work, and bring ideas to life on the screen. The area that I fell most deeply in love with, though, was fullstack web development. Now, I'm focusing my energy on becoming the best software engineer I can be, learning new skills and working on projects daily.
          </div>
        </div>
      </div>
    );
  }
}
