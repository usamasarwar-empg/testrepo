async function getProfile() {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/dashboard/`, {
      method: 'GET',
      headers: { jwt_token: localStorage.token },
    });

    const parseData = await res.json();
    console.log('Parse Data: ');
    console.log(parseData);
    return {
      firstname: parseData[0].firstname,
      lastname: parseData[0].lastname,
    };
  } catch (err) {
    console.error(err.message);
  }
}

export default getProfile;
