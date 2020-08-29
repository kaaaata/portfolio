import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts } from '../styles';
import { graphqlQuery, saveText, trackStats } from '../utils/graphql';

export const CopyPaster = () => {
  const [inputText, setInputText] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  const gqlSaveText = debounce(async(text) => {
    await saveText(JSON.stringify(text));
    setIsSaved(true);
  }, 750);

  useEffect(() => {
    window.scroll(0, 0);
    trackStats('visited_copypaster');

    const cb = async() => {
      const { text } = await graphqlQuery('{ text }');
      setInputText(JSON.parse(text));
    };

    cb();
  }, []);

  const onTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setIsSaved(false);
    gqlSaveText(text);
  };

  const textareaStyles = css`
    outline: none;
    width: 100%;
    height: 500px;
    background: transparent;
    color: ${colors.white};
    border: 2px solid ${isSaved ? colors.green : colors.red};
    ${fonts.ptSerif}
    font-size: 16px;
    padding: 10px;
    resize: vertical;
    margin-bottom: 40px;
  `;

  return (
    <React.Fragment>
      <textarea
        css={textareaStyles}
        value={inputText}
        onChange={onTextChange}
        spellCheck={false}
      />
    </React.Fragment>
  );
};
