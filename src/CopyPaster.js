import React from 'react';
import { throttle } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts } from './styles';
import { graphqlQuery, saveText } from './utils/graphql';

class CopyPaster extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      isSaved: true
    };

    this.saveText = throttle((inputText) => {
      saveText(JSON.stringify(inputText));
    }, 1000);

    this.timeout = null;
  }

  async componentDidMount() {
    const { text } = await graphqlQuery('{ text }');
    this.setState({ inputText: JSON.parse(text) });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleTextChange(e) {
    const inputText = e.target.value;
    this.setState({ inputText, isSaved: false });
    this.timeout = setTimeout(() => (
      this.setState({ isSaved: true })
    ), 1000);
    this.saveText(inputText);
  }

  render() {
    const textareaStyles = css`
      outline: none;
      width: 100%;
      height: 500px;
      background: transparent;
      color: ${colors.blueLight};
      border: 2px solid ${this.state.isSaved ? colors.green : colors.red};
      ${fonts.montserrat}
      font-size: 16px;
      padding: 10px;
      resize: vertical;
    `;

    return (
      <textarea
        css={textareaStyles}
        value={this.state.inputText}
        onChange={e => this.handleTextChange(e)}
        spellCheck={false}
      />
    );
  }
}

export default CopyPaster;
