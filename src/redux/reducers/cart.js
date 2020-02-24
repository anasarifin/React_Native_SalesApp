const initialValue = {
  cartList: [],
  totalPrice: 0,
  isPending: false,
  isRejected: false,
  isFulfilled: false,
};

const moveToCart = (state = initialValue, action) => {
  // if (action.type === "COUNT_ADD") {
  // 	return {
  //         ...state,
  //         number: state.number += action.payLoad;
  //     }
  // }
  switch (action.type) {
    // case 'CART_ADD_PENDING':
    //   return {
    //     ...state,
    //     isPending: true,
    //   };
    // case 'CART_ADD_REJECTED':
    //   return {
    //     ...state,
    //     isRejected: true,
    //   };
    // case 'CART_ADD_FULFILLED':
    //   return {
    //     ...state,
    //     isFulfilled: true,
    //     cartList: [...state.cartList, action.payload],
    //   };
    case 'CART_ADD':
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    case 'CART_RESET':
      return {
        ...state,
        cartList: [],
      };
    case 'CART_ADD_PRICE':
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload,
      };
    case 'CART_REDUCE_PRICE':
      return {
        ...state,
        totalPrice: state.totalPrice - action.payload,
      };
    case 'CART_RESET_PRICE':
      return {
        ...state,
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default moveToCart;

//pending
//rejected
//fulfilled
