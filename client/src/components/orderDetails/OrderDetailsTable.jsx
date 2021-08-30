import React from 'react';

function OrderDetailsTable({ allOrderDetails }) {
  return (
    <div>
      <div className="table-responsive-sm" style={{ overflowX: 'scroll' }}>
        <table className="table table-striped table-hover table-bordered table-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Order ID</th>
              <th scope="col">LineItem ID</th>
              <th scope="col">Order Delivery Date</th>
              <th scope="col">IMEI_1</th>
              <th scope="col">IMEI_2</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {allOrderDetails.length !== 0
                            && allOrderDetails.map((orderdetails) => (
                              <tr key={orderdetails.id}>
                                <td>{orderdetails.id}</td>
                                <td>{orderdetails.order_id}</td>
                                <td>{orderdetails.lineitem_id}</td>
                                <td>{orderdetails.order_deliver_date}</td>
                                <td>{orderdetails.IMEI_1}</td>
                                <td>{orderdetails.IMEI_2}</td>
                                <td>{orderdetails.serial_number}</td>
                                <td>{orderdetails.order_date}</td>
                              </tr>
                            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetailsTable;
