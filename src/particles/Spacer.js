import React from 'react';

const Spacer = ({ size = 1 }) => Array(size)
  .fill(null)
  .map((space, index) => (
    <br key={index} />
  ));

export default Spacer;
