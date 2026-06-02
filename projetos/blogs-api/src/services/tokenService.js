const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const authorization = (data) => {
  const jwtConfig = {
    expiresIn: '2d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, SECRET, jwtConfig);

  return token;
};

module.exports = authorization;