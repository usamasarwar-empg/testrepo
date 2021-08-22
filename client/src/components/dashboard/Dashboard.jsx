import React from 'react';
import SearchBar from './SearchBar';
import Footer from './Footer';

const Dashboard = ({ setAuth, firstname, lastname }) => (
  <div>
    <div className="d-flex mt-5 justify-content-around">
      <h2>
        {`${firstname} ${lastname}`}
        {' '}
        Logged in!

      </h2>
      <p className="display-6">Dashboard</p>
      {/* <Link to="/address" className="btn btn-primary" > Show addresses </Link> */}
      <SearchBar />
    </div>
    <Footer />
  </div>
);

export default Dashboard;
