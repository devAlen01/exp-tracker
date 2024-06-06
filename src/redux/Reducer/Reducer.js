const initState = {
  product: [],
  cash: 0,
  expenses: 0,
};

export const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_MONEY":
      return {
        ...state,
        cash: (state.cash += action.payload),
      };
    case "RESET":
      return { ...state, expenses: 0 };
    case "ADD_PRODUCT":
      return { ...state, product: [...state.product, action.payload] };

    case "BUY_PRODUCT":
      return {
        ...state,
        cash: state.cash - action.payload,
        expenses: state.expenses + action.payload,
      };

    case "DELETE":
      return {
        ...state,
        product: state.product.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
