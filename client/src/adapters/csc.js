/* eslint-disable no-underscore-dangle */
const _getCountries = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/csc/countries`, {
      method: 'GET',
      headers: { jwt_token: localStorage.token },
    });
    console.log(process.env);
    console.log('Countries res: ');
    console.log(res);
    const parseData = await res.json();
    console.log('Countries Parse Data');
    console.log(parseData);
    return parseData;
  } catch (err) {
    console.error(err);
  }
};

const _getStates = async (countryId) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/csc/states/${countryId}`, {
      method: 'GET',
      headers: { jwt_token: localStorage.token },
    });
    console.log('States res: ');
    console.log(res);
    const parseData = await res.json();
    console.log('States Parse Data');
    console.log(parseData);
    return parseData;
  } catch (err) {
    console.error(err);
  }
};

const _getCities = async (countryId, stateId) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/csc/cities/${countryId}/${stateId}`, {
      method: 'GET',
      headers: { jwt_token: localStorage.token },
    });
    console.log('Cities res: ');
    console.log(res);
    const parseData = await res.json();
    console.log('Cities Parse Data');
    console.log(parseData);
    return parseData;
  } catch (err) {
    console.error(err);
  }
};

export { _getCountries, _getStates, _getCities };
