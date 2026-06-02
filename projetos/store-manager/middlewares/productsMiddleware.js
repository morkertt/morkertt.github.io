const verifyNameAndQuantity = (name, quantity) => {
  if (!name) {
    return { status: 400, message: '"name" is required' };
  }
  if (name.length < 5) {
    return {
      status: 422, message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity === undefined) {
    return { status: 400, message: '"quantity" is required' };
  }
  if (quantity <= 0) {
    return {
      status: 422, message: '"quantity" must be greater than or equal to 1',
    };
  }
};

const verifyProduct = (req, resp, next) => {
  const { name, quantity } = req.body;
  const result = verifyNameAndQuantity(name, quantity);
  if (result) {
    return resp.status(result.status).json({ message: result.message });
  }
  next();
};

module.exports = { verifyProduct };