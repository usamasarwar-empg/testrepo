import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Navbar({ setAuth }) {
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

  return (
    <div className="mb-10 pb-10">
      <nav className="navbar fixed-top mb-10 pb-10 navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className=" navbar-brand nav-link active"> Phantom </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active"> Home </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active"> Dashboard </Link>
              </li>
              <li className="nav-item">
                <Link to="/address" className="nav-link active"> Address </Link>
              </li>
            </ul>
            <button className="btn btn-danger" type="button" onClick={(e) => logout(e)}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
