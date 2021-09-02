/* eslint-disable no-underscore-dangle */
const _getOrderDetails = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/orderdetails/`, {
      method: 'GET',
      headers: { jwt_token: localStorage.token },
    });
    console.log(process.env);
    console.log('res: ');
    console.log(res);
    const parseData = await res.json();
    console.log('Parse Data');
    console.log(parseData);
    return parseData;
  } catch (err) {
    console.error(err);
  }
};

export default _getOrderDetails;
