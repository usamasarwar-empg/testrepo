import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

// adapters
import { _addAddress, _updateAddress } from '../../adapters/address';
import { _getCountries, _getStates, _getCities } from '../../adapters/csc';

function AddressForm({
  setviewFlag, setAddressChange, addressChange, firstname, lastname, allAddresses
}) {
  const [address1, setAddress1] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].address1
  );
  const [address2, setAddress2] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].address2
  );
  const [city_name, setCityName] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].city_name
  );
  const [zipcode, setZipcode] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].zipcode
  );
  const [company, setCompany] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].company
  );
  const [state_id, setStateId] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].state_id
  );
  const [state_name, setStateName] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].state_name
  );
  const [country_id, setCountryId] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].country_id
  );
  const [phone, setPhone] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].phone
  );
  const [alternative_phone, setAlternativePhone] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].alternative_phone
  );
  const [latitude, setLatitude] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].latitude
  );
  const [longitude, setLongitude] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].longitude
  );
  const [street, setStreet] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].street
  );
  const [building, setBuilding] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].building
  );
  const [floor, setFloor] = useState(
    allAddresses.length === 0 ? '' : allAddresses[0].floor
  );

  const [countryValue, setCountryValue] = useState({});
  const [stateValue, setStateValue] = useState({});
  const [cityValue, setCityValue] = useState({});

  // Options for typeahead/ dropdowns
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  // cscValue -- 0 if csc not selected, 1 if country selected, 2 if country and state selected,
  //             3 if all selected
  const [cscValue, setCscValue] = useState(0);

  useEffect(() => {
    if (cscValue === 0) {
      const getCountries = async () => {
        const countryOpt = await _getCountries();
        setCountryOptions(countryOpt);
      };
      getCountries();
    }

    if (cscValue === 1 || cscValue === -1) {
      console.log(`cscValue ${cscValue}`);
      const getStates = async () => {
        const stateOpt = await _getStates(countryValue.id);
        setStateOptions(stateOpt);
      };
      getStates();
    }

    if (cscValue === 2 || cscValue === -2) {
      console.log(`cscValue ${cscValue}`);
      const getCities = async () => {
        const cityOpt = await _getCities(countryValue.id, stateValue.id);
        setCityOptions(cityOpt);
      };
      getCities();
    }

    // cleanup
    return () => {

    };
  }, [cscValue, countryValue.id, stateValue.id]);

  const onSubmitUpdatedForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        firstname,
        lastname,
        address1,
        address2,
        city_name,
        zipcode,
        company,
        state_id,
        state_name,
        country_id,
        phone,
        alternative_phone,
        latitude,
        longitude,
        street,
        building,
        floor
      };

      const response = await _updateAddress(body);

      if (response) {
        setviewFlag(0);
        setAddressChange(!addressChange);

        setAddress1('');
        setAddress2('');
        setCityName('');
        setZipcode('');
        setCompany('');
        setStateId('');
        setStateName('');
        setCountryId('');
        setPhone('');
        setAlternativePhone('');
        setLatitude('');
        setLongitude('');
        setStreet('');
        setBuilding('');
        setFloor('');
      }
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitNewForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        firstname,
        lastname,
        address1,
        address2,
        city_name,
        zipcode,
        company,
        state_id,
        state_name,
        country_id,
        phone,
        alternative_phone,
        latitude,
        longitude,
        street,
        building,
        floor
      };

      const response = await _addAddress(body);

      if (response) {
        setviewFlag(0);
        setAddressChange(!addressChange);

        setAddress1('');
        setAddress2('');
        setCityName('');
        setZipcode('');
        setCompany('');
        setStateId('');
        setStateName('');
        setCountryId('');
        setPhone('');
        setAlternativePhone('');
        setLatitude('');
        setLongitude('');
        setStreet('');
        setBuilding('');
        setFloor('');
      }
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="jumbotron">
      <form
        role="form"
        onSubmit={allAddresses.length === 0 ? onSubmitNewForm : onSubmitUpdatedForm}
        className="address-form"
      >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstname">First Name</label>

            <input
              type="text"
              className="form-control"
              id="inputFirstname"
              placeholder="Enter Firstname"
              value={firstname}
              disabled
              style={{ backgroundColor: 'InfoBackground' }}
            />

          </div>

          <div className="form-group col-md-6">
            <label htmlFor="inputLastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputLastname"
              placeholder="Enter Lastname"
              value={lastname}
              disabled
              style={{ backgroundColor: 'InfoBackground' }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputAddress1">Address 1</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress1"
            placeholder="1234 Main St"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>

        <div className="form-row">

          <div className="form-group col-md-4">
            <label htmlFor="inputZip">Zip Code</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="0123"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>

          <div className="form-group col-md-8">
            <label htmlFor="inputCompany">Company</label>
            <input
              type="text"
              className="form-control"
              id="inputCompany"
              placeholder=""
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="inputCountry">Country</label>
            <Typeahead
              id="inputCountry"
              options={countryOptions}
              labelKey="name"
              placeholder="Choose your country..."
              emptyLabel="No Countries found"
                            // defaultInputValue={
                            //     countryOptions.length === 0 ? '' : (
                            //         countryOptions.filter((country) => {
                            //             return country.id === country_id;
                            //         })
                            //         [0].name)}
              onChange={(selected) => {
                // console.log(selected[0].isoCode);
                if (selected[0]) {
                  setCscValue(cscValue === 1 ? -1 : 1);
                  console.log(cscValue);
                  setCountryValue(selected[0]);
                  setCountryId(selected[0].id);
                } else {
                  setCountryValue({});
                  setStateValue({});
                  setCityValue({});
                }
              }}
            />

          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <Typeahead
              id="inputState"
              options={stateOptions}
              labelKey="name"
              placeholder="Choose your State..."
              emptyLabel="No States found"
                            // defaultInputValue={state_name}
              onChange={(selected) => {
                if (selected[0]) {
                  setCscValue(cscValue === 2 ? -2 : 2);
                  setStateValue(selected[0]);
                  setStateId(selected[0].id);
                  setStateName(selected[0].name);
                } else {
                  setStateValue({});
                  setCityValue({});
                }
              }}
            />

          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputCity">City</label>
            <Typeahead
              id="inputState"
              options={cityOptions}
              labelKey="name"
              placeholder="Choose your City..."
              emptyLabel="No Cities found"
                            // defaultInputValue={city_name}
              onChange={(selected) => {
                if (selected[0]) {
                  setCscValue(cscValue === 3 ? -3 : 3);
                  setCityValue(selected[0]);
                  setCityName(selected[0].name);
                } else setCityValue({});
              }}
            />

          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputPhone1">Phone</label>
            <input
              type="text"
              className="form-control"
              id="inputPhone1"
              placeholder="03xx-xxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="inputPhone2">Alternative Phone</label>
            <input
              type="text"
              className="form-control"
              id="inputPhone2"
              placeholder="03xx-xxxxxxx"
              value={alternative_phone}
              onChange={(e) => setAlternativePhone(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputLatitude">Latitude</label>
            <input
              type="number"
              className="form-control"
              id="inputLatitude"
              step="any"
              placeholder="0.00"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="inputLongitude">Longitude</label>
            <input
              type="number"
              className="form-control"
              id="inputLongitude"
              step="any"
              placeholder="0.00"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputStreet">Street</label>
            <input
              type="text"
              className="form-control"
              id="inputStreet"
              placeholder=""
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputBuilding">Building</label>
            <input
              type="text"
              className="form-control"
              id="inputBuilding"
              placeholder=""
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputFloor">Floor</label>
            <input
              type="text"
              className="form-control"
              id="inputFloor"
              placeholder="#"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end pt-4">
          {allAddresses.length === 0
                        && <button type="submit" className="btn btn-primary">Add Address</button>}
          {allAddresses.length === 1
                        && <button type="submit" className="btn btn-primary">Update Address</button>}

        </div>
      </form>
    </div>

  );
}

export default AddressForm;
