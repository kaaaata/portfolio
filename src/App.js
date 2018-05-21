import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import * as actions from './redux/actions';
// import store from './redux/store';

import { FireworksToggle, Header, Selfie, Blurb, Footer } from './Home';
import { Feature, Projects, Project } from './Projects';
import { Skills } from './Skills';
import { About, Resume } from './About';

import { fireworks } from './animations/fireworks';

import './styles/App.css';

const mapStateToProps = (state) => ({
  projects: state.default.projects,
  skills: state.default.skills,
});
const mapDispatchToProps = (dispatch) => ({
  //
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(class App extends Component {
  componentDidMount() {
    window.scroll(0, 0);
    window.onblur = () => document.title = 'imy ily ♥ | Catherine Han';
    window.onfocus = () => document.title = 'Catherine Han';
    fireworks();
  }
  
  render() {
    const { projects, skills } = this.props;

    return (
      <main className="app">
        <FireworksToggle />
        <Switch>
          <Route
            exact path="/"
            render={() => <React.Fragment>
              <Header title="Catherine Han" />
              <Selfie />
              <Blurb />
              <h1 className="title">Projects</h1>
              <Feature project={projects[0]} mini={false} />
              <Projects projects={projects.slice(1)} />
              <h1 className="title">Skills</h1>
              <Skills skills={skills} />
              <h1 className="title">My Story</h1>
              <About />
              <Resume />
            </React.Fragment>}
          />
          <Route
            exact path="/projects"
            render={() => <React.Fragment>
              <Header title="Projects" />
              <Feature project={projects[0]} mini={false} />
              <Projects projects={projects.slice(1)} />
            </React.Fragment>}
          />
          <Route
            exact path="/skills"
            render={() => <React.Fragment>
              <Header title="Skills" />
              <Skills skills={skills} />
            </React.Fragment>}
          />
          <Route
            exact path="/about"
            render={() => <React.Fragment>
              <Header title="About" />
              <About />
            </React.Fragment>}
          />
          {projects.map(project => (
            <Route
              key={project.name}
              exact path={`/${project.route}`}
              render={() => <React.Fragment>
                <Header title={project.name} />
                <Project project={project} />
              </React.Fragment>}
            />
          ))}
        </Switch>
        <Footer />
      </main>
    );
  }
}));
