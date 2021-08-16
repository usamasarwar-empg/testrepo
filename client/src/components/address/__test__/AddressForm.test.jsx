import React from "react";
import { render, fireEvent, waitFor, act, findByPlaceholderText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import "mutationobserver-shim"
import { allAddressesTest } from "./globals";
import AddressForm from "../AddressForm";
import { _updateAddress, _addAddress } from '../../../adapters/address';
import { _getCountries, _getStates, _getCities } from '../../../adapters/csc';

jest.mock('../../../adapters/address');
jest.mock('../../../adapters/csc');

describe('Address Form Component tests', () => {

    beforeAll(async () => {
        _getCountries.mockResolvedValue([]);
        _getStates.mockResolvedValue([]);
        _getCities.mockResolvedValue([]);
    })

    describe('When adding address', () => {
        test('should show all fields in the form', async () => {

            const { getByRole, getByLabelText, getByPlaceholderText } = render(<MemoryRouter> <AddressForm allAddresses={[]} /> </MemoryRouter>);

            await waitFor(async () => {
                expect(getByRole('form')).toBeInTheDocument();
                expect(getByLabelText(/first name/i).value).toBe('');
                expect(getByLabelText(/last name/i).value).toBe('');
                expect(getByLabelText(/address 1/i).value).toBe('');
                expect(getByLabelText(/address 2/i).value).toBe('');
                expect(getByLabelText(/zip code/i).value).toBe('');
                expect(getByLabelText(/company/i).value).toBe('');
                expect(getByPlaceholderText(/choose your country/i)).toBeInTheDocument();
                expect(getByPlaceholderText(/choose your state/i)).toBeInTheDocument();
                expect(getByPlaceholderText(/choose your city/i)).toBeInTheDocument();
                expect(getByPlaceholderText(/choose your country/i).value).toBe('');
                expect(getByPlaceholderText(/choose your state/i).value).toBe('');
                expect(getByPlaceholderText(/choose your city/i).value).toBe('');
                expect(getByLabelText('Phone').value).toBe('');
                expect(getByLabelText(/alternative phone/i).value).toBe('');
                expect(getByLabelText(/latitude/i).value).toBe('');
                expect(getByLabelText(/longitude/i).value).toBe('');
                expect(getByLabelText(/street/i).value).toBe('');
                expect(getByLabelText(/building/i).value).toBe('');
                expect(getByLabelText(/floor/i).value).toBe('');
            });

        })

        test('should show add address button in the form', async () => {
            const { getByRole } = render(<MemoryRouter> <AddressForm allAddresses={[]} /> </MemoryRouter>);

            await waitFor(async () => {
                expect(getByRole('button', { name: /add address/i })).toBeInTheDocument();
            })
        })

        test('should change field values on inserting', async () => {
            const { getByLabelText,
                getByPlaceholderText,
                findByPlaceholderText,
                findByLabelText } = render(
                    <MemoryRouter>
                        <AddressForm
                            allAddresses={[]}
                            firstname={allAddressesTest[0].firstname}
                            lastname={allAddressesTest[0].lastname}
                        />
                    </MemoryRouter>);


            fireEvent.change(await findByLabelText(/address 1/i), {
                target: {
                    value: allAddressesTest[0].address1
                }
            })
            fireEvent.change(await findByLabelText(/address 2/i), {
                target: {
                    value: allAddressesTest[0].address2
                }
            });
            fireEvent.change(await findByLabelText(/zip code/i), {
                target: {
                    value: allAddressesTest[0].zipcode
                }
            });
            fireEvent.change(await findByLabelText(/company/i), {
                target: {
                    value: allAddressesTest[0].company
                }
            });
            fireEvent.change(await findByLabelText('Phone'), {
                target: {
                    value: allAddressesTest[0].phone
                }
            });
            fireEvent.change(await findByLabelText(/alternative phone/i), {
                target: {
                    value: allAddressesTest[0].alternative_phone
                }
            });
            fireEvent.change(await findByLabelText(/latitude/i), {
                target: {
                    value: allAddressesTest[0].latitude
                }
            });
            fireEvent.change(await findByLabelText(/longitude/i), {
                target: {
                    value: allAddressesTest[0].longitude
                }
            });
            fireEvent.change(await findByLabelText(/street/i), {
                target: {
                    value: allAddressesTest[0].street
                }
            });
            fireEvent.change(await findByLabelText(/building/i), {
                target: {
                    value: allAddressesTest[0].building
                }
            });
            fireEvent.change(await findByLabelText(/floor/i), {
                target: {
                    value: allAddressesTest[0].floor
                }
            });

            await waitFor(() => {
                expect(getByLabelText(/first name/i).value).toBe(allAddressesTest[0].firstname);
                expect(getByLabelText(/last name/i).value).toBe(allAddressesTest[0].lastname);
                expect(getByLabelText(/address 1/i).value).toBe(allAddressesTest[0].address1);
                expect(getByLabelText(/address 2/i).value).toBe(allAddressesTest[0].address2);
                expect(getByLabelText(/zip code/i).value).toBe(allAddressesTest[0].zipcode);
                expect(getByLabelText(/company/i).value).toBe(allAddressesTest[0].company);
                expect(getByLabelText('Phone').value).toBe(allAddressesTest[0].phone);
                expect(getByLabelText(/alternative phone/i).value).toBe(allAddressesTest[0].alternative_phone);
                expect(getByLabelText(/latitude/i).value).toBe(allAddressesTest[0].latitude.toString());
                expect(getByLabelText(/longitude/i).value).toBe(allAddressesTest[0].longitude.toString());
                expect(getByLabelText(/street/i).value).toBe(allAddressesTest[0].street);
                expect(getByLabelText(/building/i).value).toBe(allAddressesTest[0].building);
                expect(getByLabelText(/floor/i).value).toBe(allAddressesTest[0].floor);
            })

        })

        test('should call add address api on add button clicked', async () => {
            const setAddressChange = jest.fn();
            const setviewFlag = jest.fn();
            _addAddress.mockResolvedValue(true);

            const { findByRole } = render(
                <MemoryRouter>
                    <AddressForm
                        allAddresses={[]}
                        setAddressChange={setAddressChange}
                        setviewFlag={setviewFlag}

                    />
                </MemoryRouter>);

            const addBtn = await findByRole('button', { name: /add address/i });
            fireEvent.click(addBtn);

            await waitFor(async () => {
                expect(_addAddress).toHaveBeenCalled();
                expect(setviewFlag).toHaveBeenCalled();
                expect(setAddressChange).toHaveBeenCalled();

            })
        })

    })

    describe('when updating address', () => {

        test('should show all fields with values in the form while updating', async () => {

            const { getByRole, getByLabelText } = render(<MemoryRouter> <AddressForm allAddresses={allAddressesTest} /> </MemoryRouter>);

            await waitFor(async () => {
                expect(getByRole('form')).toBeInTheDocument();
                expect(getByLabelText(/address 1/i).value).toBe(allAddressesTest[0].address1);
                expect(getByLabelText(/address 2/i).value).toBe(allAddressesTest[0].address2);
                expect(getByLabelText(/zip code/i).value).toBe(allAddressesTest[0].zipcode);
                expect(getByLabelText(/company/i).value).toBe(allAddressesTest[0].company);
                expect(getByLabelText('Phone').value).toBe(allAddressesTest[0].phone);
                expect(getByLabelText(/alternative phone/i).value).toBe(allAddressesTest[0].alternative_phone);
                expect(getByLabelText(/latitude/i).value).toBe(allAddressesTest[0].latitude.toString());
                expect(getByLabelText(/longitude/i).value).toBe(allAddressesTest[0].longitude.toString());
                expect(getByLabelText(/street/i).value).toBe(allAddressesTest[0].street);
                expect(getByLabelText(/building/i).value).toBe(allAddressesTest[0].building);
                expect(getByLabelText(/floor/i).value).toBe(allAddressesTest[0].floor);
            });

        })

        test('should show update address button in the form', async () => {
            const { getByRole } = render(<MemoryRouter> <AddressForm allAddresses={allAddressesTest} /> </MemoryRouter>);

            await waitFor(async () => {
                expect(getByRole('button', { name: /update address/i })).toBeInTheDocument();
            })
        })

        test('should call update address api on update button clicked', async () => {
            const setAddressChange = jest.fn();
            const setviewFlag = jest.fn();
            _updateAddress.mockResolvedValue(true);

            const { findByRole } = render(
                <MemoryRouter>
                    <AddressForm
                        allAddresses={allAddressesTest}
                        setAddressChange={setAddressChange}
                        setviewFlag={setviewFlag}

                    />
                </MemoryRouter>);

            const updateBtn = await findByRole('button', { name: /update address/i });
            fireEvent.click(updateBtn);

            await waitFor(async () => {
                expect(_updateAddress).toHaveBeenCalled();
                expect(setviewFlag).toHaveBeenCalled();
                expect(setAddressChange).toHaveBeenCalled();

            })
        })


    })

})

