import * as TYPE from "../../type/transaction";

const initialState = {
  findTransactionLoading: false,
  findTransactionResult: false,
  findTransactionError: false,

  getTransactionLoading: false,
  getTransactionResult: false,
  getTransactionError: false,

  createTransactionLoading: false,
  createTransactionResult: false,
  createTransactionError: false,
};

const trans = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPE.FIND_TRANSACTION:
      return {
        ...state,
        findTransactionLoading: payload.loading,
        findTransactionResult: payload.data,
        findTransactionError: payload.error,
      };

    case TYPE.GET_TRANSACTION:
      return {
        ...state,
        getTransactionLoading: payload.loading,
        getTransactionResult: payload.data,
        getTransactionError: payload.error,
      };

    case TYPE.CREATE_TRANSACTION:
      return {
        ...state,
        createTransactionLoading: payload.loading,
        createTransactionResult: payload.data,
        createTransactionError: payload.error,
      };

    default:
      return state;
  }
};

export default trans;
