import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import * as actions from './redux/actions';
// import store from './redux/store';

import { LineBreak } from './StyledComponents';
import { Header, Selfie, Blurb } from './Home';
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
              <Feature project={projects[0]} />
              <Projects projects={projects.slice(1)} />
            </React.Fragment>}
          />
          {projects.map(project => (
            <Route
              key={project.name}
              exact path={`/${project.route}`}
              render={() => <React.Fragment>
                <Project project={project} />
              </React.Fragment>}
            />
          ))}
        </Switch>
      </main>
    );
  }
}));
