const initialValue = {
  categoryList: [
    {
      id: 0,
      name: 'Sushi',
    },
    {
      id: 1,
      name: 'Frieds',
    },
  ],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
};

const getCategory = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_PENDING':
      return {
        ...state,
        isPending: true,
      };
    case 'GET_CATEGORY_REJECTED':
      return {
        ...state,
        isRejected: true,
      };
    case 'GET_CATEGORY_FULFILLED':
      console.log(action.payload.data);
      return {
        ...state,
        isFulfilled: true,
        categoryList: action.payload.data,
      };
    default:
      return state;
  }
};

export default getCategory;
