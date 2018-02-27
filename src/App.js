import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Header from './Header';
import Landing from './Landing';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
// import Contact from './Contact';
// import Footer from './Footer';
import './App.css';

export default class App extends Component {
  scrollToRef(ref) {
    scrollToComponent(this.refs[ref], { offset: 0, align: 'middle', duration: 1500, ease: 'outQuart' });
  }

  render() {
    return (
      <div className="app">
        <Header scrollToRef={this.scrollToRef.bind(this)} />
        <Landing ref="home" />
        <About ref="about" />
        <Projects ref="projects" />
        <Skills ref="skills" />
        {/* <Landing />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer /> */}
      </div>
    );
  }
}
