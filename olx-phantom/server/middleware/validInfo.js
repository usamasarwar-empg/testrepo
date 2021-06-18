// eslint-disable-next-line func-names
module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  // check a valid email has been entered by using a regex function
  function validEmail(userEmail) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {
    if (!email) {
      return res.json('Missing Parameters');
    }
    // console.log(!email.length);
    if (![email, name, password].every(Boolean)) {
      return res.json('Missing Credentials');
    } if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials');
    } if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  }

  next();
};
