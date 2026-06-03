import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../reducers';

// O store precisa do redux-thunk para as actions assíncronas (busca de cotação).
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
