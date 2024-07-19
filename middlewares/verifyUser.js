const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.header('auth-token');
  console.log('token',token);
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'zedApp');
    if (!verified.isAdmin) return res.status(403).send('Access Denied');

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = verifyUser;