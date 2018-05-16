import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import * as actions from './redux/actions';
// import store from './redux/store';

import { LineBreak } from './StyledComponents';
import { Header, Selfie, Blurb, Footer } from './Home';
import { Feature, Projects, Project } from './Projects';

import './styles/App.css';

const mapStateToProps = (state) => ({
  projects: state.default.projects,
});
const mapDispatchToProps = (dispatch) => ({
  //
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(class App extends Component {
  render() {
    const { projects } = this.props;

    return (
      <main className="app">
        <Header />
        <LineBreak />
        <Switch>
          <Route
            exact path="/"
            render={() => <React.Fragment>
              <Selfie /><LineBreak />
              <Blurb /><LineBreak />
              <h1 className="title">Projects</h1>
              <Feature project={projects[0]} mini={false} />
              <Projects projects={projects.slice(1)} /><LineBreak />
              <Footer />
            </React.Fragment>}
          />
          {projects.map(project => (
            <Route
              key={project.name}
              exact path={`/${project.route}`}
              render={() => <React.Fragment>
                <Project project={project} /><LineBreak />
                <Footer />
              </React.Fragment>}
            />
          ))}
        </Switch>
      </main>
    );
  }
}));
