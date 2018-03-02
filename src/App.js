import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Header from './Header';
import Landing from './Landing';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import './App.css';

export default class App extends Component {
  scrollToRef(ref) {
    scrollToComponent(this.refs[ref], {
      offset: -50, // height of header
      align: 'top',
      duration: ref === 'home' ? 2500 : 1500,
      ease: 'outQuart'
    });
  }

  render() {
    return (
      <div className="app">
        <Header scrollToRef={this.scrollToRef.bind(this)} />
        <Landing ref="home" />
        <About ref="about" />
        <Projects ref="projects" />
        <Skills ref="skills" />
        <Contact ref="contact" />
        <Footer />
      </div>
    );
  }
}
