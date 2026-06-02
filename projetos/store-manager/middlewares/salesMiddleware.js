const { getById } = require('../models/productsModel');

const verifyIdAndQuantity = (sales) => {
  const verifiedIdAndQuantity = sales.map((e) => {
    if (!e.productId) return { status: 400, message: '"productId" is required' };
    if (!e.quantity) return { status: 400, message: '"quantity" is required' };
    if (e.quantity <= 0) {
      return { status: 422, message: '"quantity" must be greater than or equal to 1' };
    }
    return false;
  });
  return verifiedIdAndQuantity;
};

const verifySale = (req, resp, next) => {
  const result = verifyIdAndQuantity(req.body);
  const [sales] = result.filter((element) => element !== false);
  if (sales) {
    return resp.status(sales.status).json({ message: sales.message });
  }
  next();
};

const updateQuantity = async (req, resp, next) => {
  const [{ quantity, productId }] = req.body;
  const result = await getById(productId);
  const productQuantity = result[0].quantity;
  if (productQuantity < quantity) {
    return resp.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = { verifySale, updateQuantity };