import React from 'react';
import {
  render, fireEvent, waitFor, act
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import 'mutationobserver-shim';
import { allAddressesTest } from './globals';
import Address from '../Address';
import { _getAddress, _deleteAddress, _updateAddress } from '../../../adapters/address';
import { _getCountries, _getStates, _getCities } from '../../../adapters/csc';

jest.mock('../../../adapters/address');
jest.mock('../../../adapters/csc');

describe('Address Component tests', () => {
  // tests if user's address is recieved
  describe('If user has address', () => {
    test('should show Address table if user\'s address recieved', async () => {
      _getAddress.mockResolvedValue(allAddressesTest);
      const addrComp = render(<MemoryRouter>
        {' '}
        <Address />
        {' '}
                              </MemoryRouter>);

      await waitFor(() => {
        expect(addrComp.getByRole('table')).toBeInTheDocument();
      });
    });

    test('should show \'Update Show and Delete\'  buttons if address recieved', async () => {
      _getAddress.mockResolvedValue(allAddressesTest);
      const addrComp = render(<MemoryRouter>
        <Address />
        {' '}
                              </MemoryRouter>);

      await waitFor(() => {
        expect(addrComp.getByRole('button', { name: /update address/i })).toBeInTheDocument();
        expect(addrComp.getByRole('button', { name: /delete address/i })).toBeInTheDocument();
        expect(addrComp.getByRole('button', { name: /show address/i })).toBeInTheDocument();
      });
    });

    describe('Delete address clicked', () => {
      test('should delete address table if delete button clicked', async () => {
        _getAddress.mockResolvedValue(allAddressesTest);
        const addrComp = render(<MemoryRouter>
          {' '}
          <Address />
          {' '}
                                </MemoryRouter>);

        await waitFor(async () => {
          const delBtn = addrComp.getByRole('button', { name: /delete address/i });
          expect(delBtn).toBeInTheDocument();
          act(() => {
            fireEvent.click(delBtn);
            _getAddress.mockResolvedValue([]);
          });
        });

        await waitFor(async () => {
          expect(addrComp.queryByRole('table')).not.toBeInTheDocument();
          expect(addrComp.queryByRole('button', { name: /delete address/i })).not.toBeInTheDocument();
          console.log('wait for 1st');
          expect(addrComp.getByText(/no address added/i)).toBeInTheDocument();
        });
      });

      test('should call delete address api if delete button clicked', async () => {
        _getAddress.mockResolvedValue(allAddressesTest);
        const addrComp = render(<MemoryRouter>
          <Address />
          {' '}
                                </MemoryRouter>);
        const delBtn = await addrComp.findByRole('button', { name: /delete address/i });

        act(() => {
          fireEvent.click(delBtn);
        });

        await waitFor(async () => {
          expect(_deleteAddress).toHaveBeenCalled();
        });
      });
    });

    describe('Update address clicked', () => {
      test('should show form', async () => {
        _getAddress.mockResolvedValue(allAddressesTest);
        _getCountries.mockResolvedValue([]);
        _getStates.mockResolvedValue([]);
        _getCities.mockResolvedValue([]);
        const addrComp = render(<MemoryRouter>
          {' '}
          <Address />
          {' '}
                                </MemoryRouter>);
        const updateBtn = await addrComp.findByRole('button', { name: /update address/i });

        act(() => {
          fireEvent.click(updateBtn);
        });

        await waitFor(async () => {
          expect(addrComp.getByRole('form')).toBeInTheDocument();
        });
      });

      test('should show current field values in the form', async () => {
        _getAddress.mockResolvedValue(allAddressesTest);
        _getCountries.mockResolvedValue([]);
        _getStates.mockResolvedValue([]);
        _getCities.mockResolvedValue([]);
        const addrComp = render(<MemoryRouter>
          {' '}
          <Address />
          {' '}
                                </MemoryRouter>);
        const updateBtn = await addrComp.findByRole('button', { name: /update address/i });

        act(() => {
          fireEvent.click(updateBtn);
        });

        await waitFor(async () => {
          expect(addrComp.getByRole('form')).toBeInTheDocument();
          expect(addrComp.getByLabelText(/address 1/i).value).toBe(allAddressesTest[0].address1);
          expect(addrComp.getByLabelText(/address 2/i).value).toBe(allAddressesTest[0].address2);
          expect(addrComp.getByLabelText(/zip code/i).value).toBe(allAddressesTest[0].zipcode);
          expect(addrComp.getByLabelText(/company/i).value).toBe(allAddressesTest[0].company);
          expect(addrComp.getByLabelText('Phone').value).toBe(allAddressesTest[0].phone);
          expect(addrComp.getByLabelText(/alternative phone/i).value).toBe(allAddressesTest[0].alternative_phone);
          expect(addrComp.getByLabelText(/latitude/i).value).toBe(allAddressesTest[0].latitude.toString());
          expect(addrComp.getByLabelText(/longitude/i).value).toBe(allAddressesTest[0].longitude.toString());
          expect(addrComp.getByLabelText(/street/i).value).toBe(allAddressesTest[0].street);
          expect(addrComp.getByLabelText(/building/i).value).toBe(allAddressesTest[0].building);
          expect(addrComp.getByLabelText(/floor/i).value).toBe(allAddressesTest[0].floor);
        });
      });
    });
  });

  // tests if user's address not found
  describe('If user doesn\'t have address ', () => {
    test('should show \'No address added\' msg if address not recieved', async () => {
      _getAddress.mockResolvedValue([]);
      const addrComp = render(<MemoryRouter>
        {' '}
        <Address />
        {' '}
                              </MemoryRouter>);

      await waitFor(() => {
        expect(addrComp.getByText(/no address added/i)).toBeInTheDocument();
      });
    });

    test('should show \'Add and Show Address\'  buttons if address not recieved', async () => {
      _getAddress.mockResolvedValue([]);
      const addrComp = render(<MemoryRouter>
        <Address />
        {' '}
                              </MemoryRouter>);

      await waitFor(() => {
        expect(addrComp.getByRole('button', { name: /add address/i })).toBeInTheDocument();
        expect(addrComp.getByRole('button', { name: /show address/i })).toBeInTheDocument();
      });
    });

    test('should not show \'Update or Delete Address\' buttons if address not recieved', async () => {
      _getAddress.mockResolvedValue([]);
      const addrComp = render(<MemoryRouter>
        <Address />
        {' '}
                              </MemoryRouter>);

      await waitFor(() => {
        expect(addrComp.queryByRole('button', { name: /update address/i })).not.toBeInTheDocument();
        expect(addrComp.queryByRole('button', { name: /delete address/i })).not.toBeInTheDocument();
      });
    });

    describe('Add address clicked', () => {
      test('should show form', async () => {
        _getAddress.mockResolvedValue([]);
        _getCountries.mockResolvedValue([]);
        _getStates.mockResolvedValue([]);
        _getCities.mockResolvedValue([]);
        const addrComp = render(<MemoryRouter>
          {' '}
          <Address />
          {' '}
                                </MemoryRouter>);
        const addBtn = await addrComp.findByRole('button', { name: /add address/i });

        act(() => {
          fireEvent.click(addBtn);
        });

        await waitFor(async () => {
          expect(addrComp.getByRole('form')).toBeInTheDocument();
        });
      });

      test('should show empty field values in the form', async () => {
        _getAddress.mockResolvedValue([]);
        _getCountries.mockResolvedValue([]);
        _getStates.mockResolvedValue([]);
        _getCities.mockResolvedValue([]);
        const addrComp = render(<MemoryRouter>
          {' '}
          <Address />
          {' '}
                                </MemoryRouter>);
        const addBtn = await addrComp.findByRole('button', { name: /add address/i });

        act(() => {
          fireEvent.click(addBtn);
        });

        await waitFor(async () => {
          expect(addrComp.getByRole('form')).toBeInTheDocument();
          expect(addrComp.getByLabelText(/address 1/i).value).toBe('');
          expect(addrComp.getByLabelText(/address 2/i).value).toBe('');
          expect(addrComp.getByLabelText(/zip code/i).value).toBe('');
          expect(addrComp.getByLabelText(/company/i).value).toBe('');
          expect(addrComp.getByLabelText('Phone').value).toBe('');
          expect(addrComp.getByLabelText(/alternative phone/i).value).toBe('');
          expect(addrComp.getByLabelText(/latitude/i).value).toBe('');
          expect(addrComp.getByLabelText(/longitude/i).value).toBe('');
          expect(addrComp.getByLabelText(/street/i).value).toBe('');
          expect(addrComp.getByLabelText(/building/i).value).toBe('');
          expect(addrComp.getByLabelText(/floor/i).value).toBe('');
        });
      });
    });
  });
});
