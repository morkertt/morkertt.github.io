const loginService = require('../services/loginService');
const tokenService = require('../services/tokenService');

// Req 03 - Treatments and verifications for Login
const login = async (req, resp) => {
  const { email, password } = req.body;
  const message = 'Some required fields are missing';
  if (!email || !password) return resp.status(400).json({ message });
  const data = await loginService.login({ email, password });
  if (!data) return resp.status(400).json({ message: 'Invalid fields' });
  const token = tokenService(data);
  return resp.status(200).json({ token });
};

module.exports = { login };