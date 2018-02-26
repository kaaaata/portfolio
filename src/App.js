import React, { Component } from 'react';
import Header from './Header';
// import Landing from './Landing';
// import About from './About';
// import Projects from './Projects';
// import Skills from './Skills';
// import Contact from './Contact';
// import Header from './Header';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
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
