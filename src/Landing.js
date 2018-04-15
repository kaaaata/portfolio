import React, { Component } from 'react';
import './styles/Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="background low" />
        <div className="background med" />
        <div className="background high" />
        <div className="content">      
          <br /><br /><br /><br /><br />
          <div className="name">CATHERINE HAN</div>
          <div className="title">FULLSTACK ENGINEER</div>
        </div>
      </div>
    );
  }
}
