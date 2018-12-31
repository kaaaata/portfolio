import React from 'react';
import { Redirect } from 'react-router';

const RedirectRoute = ({
  to = '/'
}) => (
  <Redirect to={to} />
);

export default RedirectRoute;
