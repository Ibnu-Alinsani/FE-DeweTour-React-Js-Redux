import { combineReducers } from "redux";

import trip from "./trip";
import user from "./user";
import trans from "./transaction";

export default combineReducers({
  trip,
  user,
  trans,
});
