import React, { Component } from 'react';
import './Contact.css';

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  render() {
    return (
      <div className="contact">
        <div className="contact-title">CONTACT</div>
        <div className="email-form">
          <div className="form-label">Name: </div>
          <div><input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder="Your name..." /></div>
          <div className="form-label">Email: </div>
          <div><input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="Your email..." /></div>
          <div className="form-label">Message: </div>
          <div><textarea value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} rows="4" cols="50" placeholder="Write me something.... Let me know if you want to work on a project together!" /></div>
          <div className="send" onClick={() => console.log(JSON.stringify(this.state))}><div>Send</div></div>
        </div>
      </div>
    );
  }
}
