import ordersModel from '../models/ordersModels';

const ordersService = {
  list: async () => ordersModel.list(),

  create: async (userId: number) => {
    const result = await ordersModel.create(userId);
    return result;
  },
};

export default ordersService;