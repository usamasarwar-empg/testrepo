import React, { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { toast } from 'react-toastify';
//  a change
// components
import Navbar from './components/navbar/Navbar';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/landing/Landing';
import Address from './components/address/Address';

// adapters
import getProfile from './adapters/profile';

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const checkAuthenticated = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/authentication/verify`, {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      // parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setIsAuthenticated(parseRes === true);
    } catch (err) {
      console.error('checkAuthenticated error: ', err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const getUserProfile = async () => {
    const name = await getProfile();
    setFirstName(name.firstname);
    setLastName(name.lastname);
  };

  // Get User Profile
  useEffect(() => {
    if (isAuthenticated) getUserProfile();
  }, [isAuthenticated]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Router>
        <Navbar setAuth={setAuth} />
        <div className="container" style={{ marginTop: '80px' }}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (!isAuthenticated ? (
                <Landing {...props} />
              ) : (
                <Redirect to="/dashboard" />
              ))}
            />
            <Route
              exact
              path="/login"
              render={(props) => (!isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              ))}
            />
            <Route
              exact
              path="/register"
              render={(props) => (!isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              ))}
            />
            <Route
              exact
              path="/address"
              render={(props) => {
                console.log('isAuth', isAuthenticated);
                return (isAuthenticated ? (
                  <Address {...props} setAuth={setAuth} firstname={firstname} lastname={lastname} />
                ) : (
                  <Redirect to="/login" />
                ));
              }}
            />

            <Route
              exact
              path="/dashboard"
              render={(props) => {
                console.log(isAuthenticated);
                return (isAuthenticated ? (
                  <Dashboard
                    {...props}
                    setAuth={setAuth}
                    firstname={firstname}
                    lastname={lastname}
                  />
                ) : (
                  <Redirect to="/login" />
                ));
              }}
            />

          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
