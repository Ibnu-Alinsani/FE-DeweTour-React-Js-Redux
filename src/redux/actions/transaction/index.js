import { Navigate } from "react-router-dom";
import { API } from "../../../config/api";
import * as TYPE from "../../type/transaction";

// const Navigate = useNavigate();
export function createTranscation(payload) {
  console.log("masuk action");
  return async (dispatch) => {
    dispatch({
      type: TYPE.CREATE_TRANSACTION,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    try {
      const response = await API.post("/add-transaction", {
        CounterQty: payload.count,
        Status: "pending",
        Total: payload.money,
        TripID: payload.id,
      });

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result, "success");
          // Navigate("/profile");
          return <Navigate to="/profile" />;
        },
        onPending: function (result) {
          console.log(result, "pending");
          // Navigate("/profile");
          return <Navigate to="/profile" />;
        },
        onError: function (result) {
          console.log(result, "error");
          // Navigate("/profile");
          return <Navigate to="/profile" />;
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      dispatch({
        type: TYPE.CREATE_TRANSACTION,
        payload: {
          loading: false,
          data: false,
          error: error,
        },
      });
    }
  };
}

export const findTransaction = () => {
  return async (dispatch) => {
    dispatch({
      type: TYPE.FIND_TRANSACTION,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    try {
      const response = await API.get("/transactions");

      dispatch({
        type: TYPE.FIND_TRANSACTION,
        payload: {
          loading: false,
          data: response.data.data,
          error: false,
        },
      });
    } catch (error) {
      dispatch({
        type: TYPE.FIND_TRANSACTION,
        payload: {
          loading: false,
          data: false,
          error: error,
        },
      });
    }
  };
};

export const getTransaction = (id) => {
  return async (dispatch) => {
    console.log("masuk get", id);
    dispatch({
      type: TYPE.GET_TRANSACTION,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    try {
      const response = await API.get(`/transaction/${id}`);
      dispatch({
        type: TYPE.GET_TRANSACTION,
        payload: {
          loading: false,
          data: response.data.data,
          error: false,
        },
      });
    } catch (error) {
      dispatch({
        type: TYPE.GET_TRANSACTION,
        payload: {
          loading: false,
          data: false,
          error: error,
        },
      });
    }
  };
};
