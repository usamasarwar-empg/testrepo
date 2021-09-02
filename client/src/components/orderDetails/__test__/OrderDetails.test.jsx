import React from 'react';
import {
  render, waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import 'mutationobserver-shim';
import allOrderDetailsTest from './globals';
import OrderDetails from '../OrderDetails';
import _getOrderDetails from '../../../adapters/orderDetails';

jest.mock('../../../adapters/orderDetails');

describe('Order Details Component Tests', () => {
  // tests if order details is recieved
  describe('If Order Details recieved', () => {
    test('should show Order Details table', async () => {
      _getOrderDetails.mockResolvedValue(allOrderDetailsTest);
      const orderDetailsComp = render(
        <MemoryRouter>
          <OrderDetails />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(orderDetailsComp.getByRole('table')).toBeInTheDocument();
      });
    });
  });
});
