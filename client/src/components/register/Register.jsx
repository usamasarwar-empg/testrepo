import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const { email, password, firstname, lastname } = inputs;

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, firstname, lastname };
      const response = await fetch(
        `${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/authentication/register`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        setAuth(true);
        toast.success('Registered Successfully');
      } else if (parseRes.message) {
        setAuth(false);
        // console.log(parseRes);
        // console.log(parseRes.message);
        toast.error(`Error: ${parseRes.message}`);
      } else {
        setAuth(false);
        toast.error(`Error: ${parseRes}`);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="firstname"
          value={firstname}
          placeholder="First name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="lastname"
          value={lastname}
          placeholder="Last name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block" type="submit">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </>
  );
};

export default Register;
