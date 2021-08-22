import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'mutationobserver-shim';
import 'whatwg-fetch';
import {
  render, fireEvent, waitFor, screen
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

import Login from '../Login';

const server = setupServer(
  rest.post(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/authentication/login`,
    (req, res, ctx) => res(ctx.json({ jwtToken: 'testToken' })))
);

const setAuth = jest.fn();

describe('Login Component tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Email password fields should be there', async () => {
    const loginComp = render(
      <MemoryRouter><Login setAuth={setAuth} /></MemoryRouter>
    );

    expect(loginComp.getByRole('heading').textContent).toBe('Login');
    expect(loginComp.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByRole('link')).toHaveTextContent('register');
    expect(loginComp.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(loginComp.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('Should change email value', async () => {
    const loginComp = render(<MemoryRouter><Login setAuth={setAuth} /></MemoryRouter>);
    const emailElem = loginComp.getByPlaceholderText('Email');
    expect(emailElem.value).toBe('');

    fireEvent.change(emailElem, {
      target: {
        value: 'testuser@email.com'
      }
    });

    expect(emailElem.value).toBe('testuser@email.com');
  });

  test('Should change password value', async () => {
    const loginComp = render(<MemoryRouter><Login setAuth={setAuth} /></MemoryRouter>);
    const passElem = loginComp.getByPlaceholderText('Password');
    expect(passElem.value).toBe('');

    fireEvent.change(passElem, {
      target: {
        value: 'testpassword'
      }
    });

    expect(passElem.value).toBe('testpassword');
  });

  test('Login should be successful if token recieved', async () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Login setAuth={setAuth} />
      </MemoryRouter>
    );
    const btnElem = getByRole('button', { name: /submit/i });
    fireEvent.click(btnElem);

    await waitFor(() => {
      expect(setAuth).toHaveBeenCalledWith(true);
    });
  });

  test('Login should not be successful if token recieved is null', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/authentication/login`,
        (req, res, ctx) => res(ctx.json({ jwtToken: null })))
    );

    const { getByRole } = render(
      <MemoryRouter>
        <Login setAuth={setAuth} />
      </MemoryRouter>
    );
    const btnElem = getByRole('button', { name: /submit/i });

    fireEvent.click(btnElem);

    await waitFor(() => {
      expect(setAuth).toHaveBeenCalledWith(false);
    });
  });
});
