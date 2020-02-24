import {combineReducers} from 'redux';
// import countReducer from './count';
import moveToCart from './cart';
// import getCategory from './category';

const reducers = combineReducers({
  //   count: countReducer,
  cart: moveToCart,
  //   category: getCategory,
});

export default reducers;
