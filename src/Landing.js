import React, { Component } from 'react';
import './Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-background landing-background-low" />
        <div className="landing-background landing-background-med" />
        <div className="landing-background landing-background-high" />
        <div className="landing-content">      
          <br /><br /><br /><br /><br />
          <div className="landing-name">CATHERINE HAN</div>
          <div className="landing-title">FRONT END ENGINEER</div>
        </div>
      </div>
    );
  }
}
