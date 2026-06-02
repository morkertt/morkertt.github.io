const userValidation = ({ email, password }) => {
  if (!email || !email.includes('@')) {
    return '"email" must be a valid email';
  }
  if (!password || password.length < 6) {
    return '"password" length must be at least 6 characters long';
  }
  return null;
};

module.exports = { userValidation };