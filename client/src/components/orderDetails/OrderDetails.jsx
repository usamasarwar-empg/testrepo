import React, { useState, useEffect } from 'react';

// components
import OrderDetailsTable from './OrderDetailsTable';

// adapters
import _getOrderDetails from '../../adapters/orderDetails';

// styles
import '../../styles/orderDetails.css';

function OrderDetails() {
  const [allOrderDetails, setAllOrderDetails] = useState([]);

  useEffect(() => {
    console.log('ORDER DETAILS USE EFFECT');
    const getOrderDetails = async () => {
      const orderDetailsArr = await _getOrderDetails();
      setAllOrderDetails(orderDetailsArr);
      console.log(orderDetailsArr);
    };
    getOrderDetails();
  }, []);

  return (
    <>
      <div className="mt-4 text-center">
        <OrderDetailsTable allOrderDetails={allOrderDetails} />
      </div>
    </>
  );
}

export default OrderDetails;
