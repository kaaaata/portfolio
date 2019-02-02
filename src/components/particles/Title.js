import React from 'react';
import { Helmet } from "react-helmet";

const Title = ({ title }) => (
  <Helmet>
    <title>
      {title ? `${title} | Catherine Han` : 'Catherine Han'}
    </title>
  </Helmet>
);

export default Title;
