const initialValue = {
  categoryList: [],
  productList: [],
  isPending: false,
  isRejected: false,
  productsComplete: false,
};

const getProducts = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_PENDING':
      return state;
    case 'GET_CATEGORY_REJECTED':
      return state;
    case 'GET_CATEGORY_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        categoryList: action.payload.data,
      };
    case 'GET_PRODUCTS_PENDING':
      return state;
    case 'GET_PRODUCTS_REJECTED':
      return state;
    case 'GET_PRODUCTS_FULFILLED':
      return {
        ...state,
        productsComplete: true,
        productList: action.payload.data,
      };
    default:
      return state;
  }
};

export default getProducts;
