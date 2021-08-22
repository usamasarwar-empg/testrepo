import React from 'react';
import {
  render
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

import Dashboard from '../Dashboard';

describe('Dashboard Component tests', () => {
  test('Firstname and lastname should be displayed', async () => {
    const [firstname, lastname] = ['test', 'user'];

    const DashboardComp = render(
      <MemoryRouter>
        <Dashboard firstname={firstname} lastname={lastname} />
      </MemoryRouter>
    );
    expect(DashboardComp.getByText(/test/)).toBeInTheDocument();
    expect(DashboardComp.getByText(/user/)).toBeInTheDocument();
  });
});
