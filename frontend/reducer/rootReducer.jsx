import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";
import OneAdminReducer from "./OneAdminReducer";
import UsersReducer from "./UsersReducer";

export default combineReducers({ AdminReducer, OneAdminReducer, UsersReducer });
