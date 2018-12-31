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
      height: 500px;
      background: ${colors.slateLight};
      border: 2px solid ${this.state.isSaved ? colors.green : colors.red};
      width: 100%;
      ${fonts.montserrat}
      font-size: 16px;
      padding: 5px 45px 5px 5px;
      resize: vertical;
    `;

    return (
      <textarea
        css={textareaStyles}
        value={this.state.inputText}
        onChange={e => this.handleTextChange(e)}
      />
    );
  }
}

export default CopyPaster;
