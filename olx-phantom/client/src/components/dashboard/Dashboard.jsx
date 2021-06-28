import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// components


const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');


  const getProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);

      setName(parseData[0].user_name); // name is the first array item
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Successfully logged out');
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();

  });

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>
          {name} User Logged in!
        </h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary" type="button">
          Logout
        </button>
      </div>


    </div>
  );
};

export default Dashboard;
