import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="jumbotron mt-5">
    <h1 className='text-center'>Welcome to Phantom POC</h1>
    <div className='text-center'>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  </div>
);

export default Landing;
