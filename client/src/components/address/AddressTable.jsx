import React from 'react';

function AddressTable({ allAddresses }) {
  return (
    <div>
      <div className="table-responsive-sm" style={{ overflowX: 'scroll' }}>
        <table className="table table-striped table-hover table-bordered table-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Address 1</th>
              <th scope="col">Address 2</th>
              <th scope="col">City</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Company</th>
              <th scope="col">State Id</th>
              <th scope="col">State Name</th>
              <th scope="col">Country Id</th>
              <th scope="col">Phone</th>
              <th scope="col">Alternative Phone</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">Street</th>
              <th scope="col">Building</th>
              <th scope="col">Floor</th>
            </tr>
          </thead>
          <tbody>
            {allAddresses.length !== 0
                            && allAddresses.id !== null
                            && allAddresses.map((address) => (
                              <tr key={address.id}>

                                <td>{address.firstname}</td>
                                <td>{address.lastname}</td>
                                <td>{address.address1}</td>
                                <td>{address.address2}</td>
                                <td>{address.city_name}</td>
                                <td>{address.zipcode}</td>
                                <td>{address.company}</td>
                                <td>{address.state_id}</td>
                                <td>{address.state_name}</td>
                                <td>{address.country_id}</td>
                                <td>{address.phone}</td>
                                <td>{address.alternative_phone}</td>
                                <td>{address.latitude}</td>
                                <td>{address.longitude}</td>
                                <td>{address.street}</td>
                                <td>{address.building}</td>
                                <td>{address.floor}</td>

                              </tr>
                            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddressTable;
