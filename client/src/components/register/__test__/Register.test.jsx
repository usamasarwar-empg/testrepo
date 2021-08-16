import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import "mutationobserver-shim"
import 'whatwg-fetch'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'

import Register from '../Register'

const server = setupServer(
    rest.post(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/authentication/register`
        , (req, res, ctx) => {
            return res(ctx.json({ jwtToken: 'testToken' }))

        })
)

const setAuth = jest.fn();

describe('Register Component tests', () => {

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())




    test('Email password fields should be there', async () => {
        const registerComp = render(
            <MemoryRouter><Register setAuth={setAuth} /></MemoryRouter>
        )

        expect(registerComp.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        expect(registerComp.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(registerComp.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(registerComp.getByPlaceholderText(/first name/i)).toBeInTheDocument();
        expect(registerComp.getByPlaceholderText(/last name/i)).toBeInTheDocument();
        expect(registerComp.getByRole('link')).toHaveTextContent(/login/i);


    })

    test('Should change email value', async () => {
        const registerComp = render(<MemoryRouter><Register setAuth={setAuth} /></MemoryRouter>);
        const emailElem = registerComp.getByPlaceholderText(/email/i);
        expect(emailElem.value).toBe('');

        fireEvent.change(emailElem, {
            target: {
                value: 'testuser@email.com'
            }
        })

        expect(emailElem.value).toBe('testuser@email.com');
    })

    test('Should change password value', async () => {
        const registerComp = render(<MemoryRouter><Register setAuth={setAuth} /></MemoryRouter>);
        const passElem = registerComp.getByPlaceholderText(/password/i);
        expect(passElem.value).toBe('');

        fireEvent.change(passElem, {
            target: {
                value: 'testpassword'
            }
        })

        expect(passElem.value).toBe('testpassword');
    })

    test('Should change firstname and lastname value', async () => {
        const registerComp = render(<MemoryRouter><Register setAuth={setAuth} /></MemoryRouter>);
        const fnElem = registerComp.getByPlaceholderText(/first name/i);
        const lnElem = registerComp.getByPlaceholderText(/last name/i);

        expect(fnElem.value).toBe('');
        expect(lnElem.value).toBe('');

        fireEvent.change(fnElem, {
            target: {
                value: 'test'
            }
        })

        fireEvent.change(lnElem, {
            target: {
                value: 'user'
            }
        })

        expect(fnElem.value).toBe('test');
        expect(lnElem.value).toBe('user');

    })

    test('Register should be successful if token recieved', async () => {
        const { getByRole } = render(<MemoryRouter> <Register setAuth={setAuth} /> </MemoryRouter>);
        const btnElem = getByRole('button', { name: /submit/i });
        fireEvent.click(btnElem);

        await waitFor(() => {
            expect(setAuth).toHaveBeenCalledWith(true);
        })
    })

    test('Register should not be successful if token recieved is null', async () => {

        server.use(
            rest.post(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/authentication/register`
                , (req, res, ctx) => {
                    return res(ctx.json({ jwtToken: null }))
                })
        );

        const { getByRole } = render(<MemoryRouter> <Register setAuth={setAuth} /> </MemoryRouter>);
        const btnElem = getByRole('button', { name: /submit/i });

        fireEvent.click(btnElem);

        await waitFor(() => {
            expect(setAuth).toHaveBeenCalledWith(false);

        })

    })

})
