import React, { useState, useEffect } from 'react';

// components
import AddressForm from './AddressForm';
import AddressTable from './AddressTable';

// adapters
import { _getAddress, _deleteAddress } from '../../adapters/address';

// styles
import '../../styles/address.css';

function Address({ firstname, lastname }) {
  // viewFlag:: 0 --> show address , 1 --> add address,update address
  const [viewFlag, setviewFlag] = useState(0);
  const [allAddresses, setAllAddresses] = useState([]);
  const [addressChange, setAddressChange] = useState(false);

  // getAddress
  useEffect(() => {
    const getAddresses = async () => {
      const addressArray = await _getAddress();
      setAllAddresses(addressArray);
    };
    getAddresses();
    setAddressChange(true);
  }, [addressChange]);

  // deleteAddress
  const deleteAddress = async () => {
    await _deleteAddress();
    setviewFlag(0);
    setAddressChange(!addressChange);
  };

  return (
    <div>
      <div className="mt-3 justify-content-around text-center">
        <button type="button" className="btn btn-primary mr-5" onClick={() => { setviewFlag(0); }}>
          Show Address
          {' '}
          <i className="fas fa-eye" />
        </button>
        {(allAddresses.length === 0)
                    && (
                    <button type="button" className="btn btn-primary" onClick={() => { setviewFlag(1); }}>
                      Add Address
                      {' '}
                      <i className="fas fa-plus" />
                    </button>
                    )}

        {(allAddresses.length > 0)
                    && (
                    <button type="button" className="btn btn-primary" onClick={() => { setviewFlag(1); }}>
                      Update Address
                      {' '}
                      <i className="far fa-edit" />
                    </button>
                    )}
        {(allAddresses.length > 0)
                    && (
                    <button type="button" className="btn btn-danger ml-5" onClick={() => { deleteAddress(); }}>
                      Delete Address
                      {' '}
                      <i className="far fa-trash-alt" />
                    </button>
                    )}
      </div>
      <div className="mt-4">
        {(viewFlag === 0)
                    && (allAddresses.length > 0)
                    && <AddressTable allAddresses={allAddresses} />}
        {(viewFlag === 0)
                    && (allAddresses.length === 0)
                    && (
                    <div className="center">
                      <p className="display-6 text-danger align-self-center">No Address Added Yet!</p>
                    </div>
                    )}
        {(viewFlag === 1)
                    && (
                    <AddressForm
                      setviewFlag={setviewFlag}
                      setAddressChange={setAddressChange}
                      addressChange={addressChange}
                      firstname={firstname}
                      lastname={lastname}
                      allAddresses={allAddresses}
                    />
                    )}
      </div>
    </div>
  );
}

export default Address;
