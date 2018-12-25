import React from 'react';
import { Link } from 'react-router-dom';
// import './styles/Home.css';

const Home = () => (
  <section>
    home page!
    <Link to='/about'>
      go to another page
    </Link>
  </section>
);

export default Home;
