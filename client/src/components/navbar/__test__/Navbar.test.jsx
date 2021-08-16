import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter, Route } from 'react-router-dom'

import Navbar from '../Navbar';

describe('NavBar Component tests', () => {

    test('should have Home, Address, Dashboard, Logout links', async () => {
        const navBarComp = render(<MemoryRouter><Navbar /></MemoryRouter>);
        expect(navBarComp.getByText(/home/i)).toBeInTheDocument();
        expect(navBarComp.getByText(/address/i)).toBeInTheDocument();
        expect(navBarComp.getByText(/dashboard/i)).toBeInTheDocument();
        expect(navBarComp.getByText(/logout/i)).toBeInTheDocument();

    })

    test('clicking Address should redirect to Address page', async () => {
        const { container, getByText } =
            render(
                <MemoryRouter>
                    <Navbar />
                    <Route path='/address'>AddressTestComp</Route>
                </MemoryRouter>);

        await act(async () => {
            const addrLink = getByText(/address/i);
            fireEvent.click(addrLink);
        })

        expect(container).toHaveTextContent('AddressTestComp');
    })

    test('clicking Dashboard or Home should redirect to Dashboard page', async () => {
        const { container, getByText } =
            render(
                <MemoryRouter>
                    <Navbar />
                    <Route path='/dashboard'>DashboardTestComp</Route>
                </MemoryRouter>);

        await act(async () => {
            const dashboardLink = getByText(/dashboard/i);
            fireEvent.click(dashboardLink);
        })

        expect(container).toHaveTextContent('DashboardTestComp');

        await act(async () => {
            const homeLink = getByText(/home/i);
            fireEvent.click(homeLink);
        })

        expect(container).toHaveTextContent('DashboardTestComp');
    })


    test('clicking logout button should logout user ( setAuth (false) )', async () => {
        const setAuth = jest.fn();
        const { getByText } = render(
            <MemoryRouter>
                <Navbar setAuth={setAuth} />
            </MemoryRouter>);

        await act(async () => {
            const logoutBtn = getByText(/logout/i);
            fireEvent.click(logoutBtn);
        })

        expect(setAuth).toHaveBeenCalledWith(false);
    })
})