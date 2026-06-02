const salesModel = require('../models/salesModel');
const { selledProducts } = require('../models/productsModel');

const getAllSales = async () => {
 const result = await salesModel.getAll();
 return result;
};

const getByIdSales = async (id) => {
 const result = await salesModel.getById(id);
 if (result.length === 0) return false;
 return result; 
};

const createSales = async (data) => {
 const id = await salesModel.insertSale(data);
 selledProducts(data);
 return { id, itemsSold: [...data] };
};

const updateSales = async (data) => {
 const result = await salesModel.updateSaleDb(data);
 return result;
};

const removeSalesService = async (id) => {
 const verifyIdOnDb = await getByIdSales(id);
 if (!verifyIdOnDb) return verifyIdOnDb;
 await salesModel.removeSalesModel(id);
 return true;
};

module.exports = { getAllSales, getByIdSales, createSales, updateSales, removeSalesService }; 