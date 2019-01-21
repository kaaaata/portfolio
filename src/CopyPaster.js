import React from 'react';
import { debounce } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts } from './styles';
import { Title } from './particles';
import { graphqlQuery, saveText } from './utils/graphql';

class CopyPaster extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      isSaved: true
    };

    this.timeout = null;
  }

  async componentDidMount() {
    const { text } = await graphqlQuery('{ text }');
    this.setState({ inputText: JSON.parse(text) });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  saveText = debounce(async (inputText) => {
    await saveText(JSON.stringify(inputText));
    this.setState({ isSaved: true });
  }, 500);

  handleTextChange(e) {
    const inputText = e.target.value;
    this.setState({ inputText, isSaved: false });
    this.saveText(inputText);
  }

  render() {
    const textareaStyles = css`
      outline: none;
      width: 100%;
      height: 500px;
      background: transparent;
      color: ${colors.white};
      border: 2px solid ${this.state.isSaved ? colors.green : colors.red};
      ${fonts.ptSerif}
      font-size: 16px;
      padding: 10px;
      resize: vertical;
      margin-bottom: 1000px;
    `;

    return <>
      <Title title='A Text Box' />
      <textarea
        css={textareaStyles}
        value={this.state.inputText}
        onChange={e => this.handleTextChange(e)}
        spellCheck={false}
      />
    </>;
  }
}

export default CopyPaster;
