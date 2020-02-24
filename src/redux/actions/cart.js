export const add = object => {
  return {
    type: 'CART_ADD',
    payload: object,
  };
};
export const reset = () => {
  return {
    type: 'CART_RESET',
    payload: [],
  };
};
export const addPrice = num => {
  return {
    type: 'CART_ADD_PRICE',
    payload: parseFloat(num),
  };
};
export const reducePrice = num => {
  return {
    type: 'CART_REDUCE_PRICE',
    payload: parseFloat(num),
  };
};
export const resetPrice = () => {
  return {
    type: 'CART_RESET_PRICE',
    payload: 0,
  };
};
