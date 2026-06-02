import { ICar } from "../../../interfaces/ICar";

const singleCarMock: ICar = {
  model: 'Uno da Escada',
  year: 1966,
  color: 'blue',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

const singleCarByIdMock: ICar & { _id: string } = {
  _id: '6329f07c5a7b48cc156f8e4a',
  model: 'Uno da Escada',
  year: 1966,
  color: 'blue',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
}

export { singleCarByIdMock, singleCarMock };