import React, { Component } from 'react';
import './Contact.css';

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="title">CONTACT</div>
        <div className="send-email">
          <a href="mailto:catherinehan714@gmail.com">
            <div>Send me an email!</div>
          </a>
        </div>
      </div>
    );
  }
}
