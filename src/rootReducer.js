
const initialValue = {
  purchases: [],
  customers: [],
  products: [],
};

const storeReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'LOADPURCHASES':
      return { ...state, purchases: action.payload };
    case 'LOADCUSTOMERS':
      return { ...state, customers: action.payload };
    case 'LOADPRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default storeReducer;