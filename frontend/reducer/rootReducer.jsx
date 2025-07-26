import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";
import OneAdminReducer from "./OneAdminReducer";
import UsersReducer from "./UsersReducer";
import authReducer from "./AuthReducer";

export default combineReducers({
  AdminReducer,
  OneAdminReducer,
  UsersReducer,
  auth: authReducer,
});
