import {combineReducers} from 'redux';
// import countReducer from './count';
import moveToCart from './cart';
import getProducts from './products';
// import getCategory from './category';

const reducers = combineReducers({
  //   count: countReducer,
  cart: moveToCart,
  products: getProducts,
});

export default reducers;
